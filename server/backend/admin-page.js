import connectToDatabase from './dbConnection.js';
import { supabase } from './dbConnection.js';
import bcrypt, { hash } from "bcrypt";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const { client } = connectToDatabase;
const secretKey = process.env.ACCESS_TOKEN_SECRET

//CHECK LOG IN [ADMIN]
export const checkLogIn = async (req,res) =>{
    const { username, password } = req.body;

    const admins = await client.query(`SELECT * FROM users WHERE status = 'Administrator' AND username = '${username}'`);
    
    if(admins.rows.length === 0){
        return res.json({ success: false, message: 'Admin not Found'});
    }

    const user = admins.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ success: false, message: 'Invalid password' });
    }else{
        return res.json({ success: true });
    }
}

//CHECK LOG IN [CUSTOMER]
export const checkCustomer = async (req,res) =>{
    const { username, password } = req.body;

    const customers = await client.query(`SELECT * FROM users WHERE status = 'Customer' AND username = '${username}'`);
    
    if(customers.rows.length === 0){
        return res.json({ success: false, message: 'Customer not Found'});
    }

    const user = customers.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ success: false, message: 'Invalid password' });
    }

    req.session.user = {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        email: user.email,
        contact: user.contact_num,
        birthDate: user.birth_date
    };

    res.json({ success: true, message: 'Log In Verified' });
}

//GET DATA
export const getData = (req, res) => {
    if (req.session.user) {
        res.json({ success: true, 
                   userId: req.session.user.id, 
                   firstName: req.session.user.first_name,
                   lastName: req.session.user.last_name,
                   address: req.session.user.address,
                   birthDate: req.session.user.birthDate,
                   contact: req.session.user.contact
                });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
}

//INSERT SIGN UP
export const newUser = async (req, res) => {
    const { firstName, lastName, userName, password, email, birthDate, contactNumber, address } = req.body;
    const status = "Customer"
    // Hash the password before inserting it into the database
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Insert the new user into the users_table
        const result = await client.query(
            `INSERT INTO users (status, first_name, last_name, username, password, email, birth_date, contact_num, address)
             VALUES ('${status}', '${firstName}', '${lastName}', '${userName}', '${hashedPassword}', '${email}', '${birthDate}', '${contactNumber}', '${address}') RETURNING *`
        );

        if (result.rowCount > 0) {
            return res.json({ success: true, message: 'User created successfully', user: result.rows[0] });
        } else {
            return res.json({ success: false, message: 'User creation failed' });
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

//USE THIS TO ADMINS TO CONVERT PASSWORDS TO HASH
export const hashPassword = async (req, res) => {
    //USERNAME: ejMamacos PASSWORD: jeojeojeo
    //USERNAME: lsJardeleza PASSWORD: lykalykalyka
    //USERNAME: glDeocampo PASSWORD: jimsjimsjims

    const name = 'dbb73ce2-7c7d-41b1-8e1d-eca8ae3a2228'
    const users = await client.query(`SELECT password FROM users WHERE status = 'Customer' AND user_id = '${name}'`);

    console.log(users.rows[0].password);

    const hashedPassword = await bcrypt.hash(users.rows[0].password, 10);

    await client.query(`UPDATE users SET password = '${hashedPassword}' WHERE user_id = '${name}'`)
    console.log(`${name} has been updated.`)
}

//DISPLAYING PRODUCTS
const bucketName = process.env.SUPABASE_BUCKET

export const displayProducts = async (req,res) =>{
    const products = await  client.query(`SELECT * FROM products_list`);
    if(products.rows.length === 0){
        return res.json({ success: false, message: 'Products not Found'});
    }

    const newResult = await Promise.all(products.rows.map(async (product) => {
        const url = await getPublicUrl(bucketName, product.image_name)
        //const checkProduct = await client.query(`SELECT * FROM shopping_cart WHERE user_id = '${userID}' AND product_id = '${productID}' AND status = 'Cart'`)
        return{
            ...product,
            productURL: url || null
        }
    }))
    return res.json(newResult);
}

//RETRIEVE IMAGE
const getPublicUrl= async (bucketName, filePath) => {
    const { data, error } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    if (error) {
        console.error('Error retrieving public URL:', error);
        return null;
    }
    return data.publicUrl;
}

//UPLOAD ADD PRODUCT FORM TO DATABASE
export const addProduct = async (req,res) =>{
    const file = req.file;
    const { name, price, description, category, image_name} = req.body;

    if(!file){
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const toTable = `
            INSERT INTO products_list (name, price, description, category, image_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [name, price, description, category, image_name];
        const submit = await client.query(toTable, values);

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(file.originalname, file.buffer, {
                contentType: file.mimetype
            });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ success: true, 
                   message: 'File and data uploaded successfully',
                   product: submit.rows[0],
                });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const displayCart = async (req,res) =>{
    const userID = req.params.userId
    const carts = await  client.query(`SELECT * FROM shopping_cart WHERE user_id = '${userID}' AND status = 'Cart'`);
    if(carts.rows.length === 0){
        return res.json({ success: false, message: 'Nothing were saved'});
    }

    const newResult = await Promise.all(carts.rows.map(async (cart) => {
        const url = await getPublicUrl(bucketName, cart.image_name)
        return{
            ...cart,
            cartURL: url || null,
            inCart: true
        }
    }))
    return res.json(newResult);
}

export const addCart = async (req,res) =>{
    const userID = req.params.userId
    const { productID } = req.body
    const checkProduct = await client.query(`SELECT * FROM shopping_cart WHERE user_id = '${userID}' AND product_id = '${productID}' AND status = 'Cart'`)
    if(checkProduct.rows.length > 0){
        return res.json({ result: false, message: 'Product is available at the cart'})
    }
    
    const selectProduct = await client.query(`SELECT * FROM products_list WHERE id = '${productID}'`)
    const productCart = selectProduct.rows[0]
    const addCart = await client.query(`INSERT INTO shopping_cart (user_id, status, name, price, image_name, amount, product_id) VALUES ('${userID}', 'Cart', '${productCart.name}', '${productCart.price}', '${productCart.image_name}', '1', '${productID}') RETURNING *`);
    if (addCart.rowCount > 0) {
        return res.json({ success: true, message: 'Cart added successfully', user: addCart.rows[0] });
    } else {
        return res.json({ success: false, message: 'Cart addition failed' });
    }
}


export const deleteCart = async (req, res) => {
    const userID = req.params.userId;
    const productID = req.params.productId;

    try {
        // Delete the cart item from the shopping_cart table
        const deleteResult = await client.query(
            `DELETE FROM shopping_cart WHERE user_id = '${userID}' AND product_id = '${productID}' AND status = 'Cart'`
        );

        if (deleteResult.rowCount > 0) {
            return res.json({ success: true, message: 'Product removed from cart successfully' });
        } else {
            return res.json({ success: false, message: 'Product not found in the cart' });
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete product from cart' });
    }
};

export const orderCart = async (req, res) => {
    const { userID, selectedProductIds, amount } = req.body;

    if (!selectedProductIds || !Array.isArray(selectedProductIds) || selectedProductIds.length === 0) {
        return res.json({ success: false, message: 'No items selected.' });
    }

    if (!Array.isArray(amount) || selectedProductIds.length !== amount.length) {
        return res.json({ success: false, message: 'Mismatch between selected products and amounts.' });
    }

    try {
        for (let i = 0; i < selectedProductIds.length; i++) {
            const productId = selectedProductIds[i];
            const productAmount = amount[i] !== null && amount[i] !== undefined ? amount[i] : 0; // Fallback to 0 if null or undefined

            await client.query(
                `UPDATE shopping_cart 
                 SET status = 'Order', amount = '${productAmount}' 
                 WHERE user_id = '${userID}' AND product_id = '${productId}'`
            );
        }

        return res.json({ success: true, message: 'Selected items updated to "Order"' });
    } catch (error) {
        console.error('Error updating items:', error);
        return res.json({ success: false, message: 'Error updating items', error });
    }
};



//ORDERS
export const displayOrder = async (req,res) =>{
    const userID = req.params.userId
    const orders = await  client.query(`SELECT * FROM shopping_cart WHERE user_id = '${userID}' AND status = 'Order'`);
    if(orders.rows.length === 0){
        return res.json({ success: false, message: 'Nothing were saved'});
    }

    const newResult = await Promise.all(orders.rows.map(async (order) => {
        const url = await getPublicUrl(bucketName, order.image_name)
        return{
            ...order,
            orderURL: url || null
        }
    }))
    return res.json(newResult);
}

const generateRandomHex = () => {
    return crypto.randomBytes(10).toString('hex');
};

//ADD ORDERS
export const addOrder = async (req,res) =>{
    const userID = req.params.userId;
    const { productID, customerName, address, contact, paymentMethod, productNames, productPrice  } = req.body;
    const orderId = generateRandomHex();
    for (let i = 0; i < productID.length; i++) {
        const productId = productID[i];
        const productName = productNames[i];
        const productPrices = productPrice[i];
        
        await client.query(`
          INSERT INTO orders_list (order_id, customer_id, customer_name, product_name, amount, address, contact_number, payment_method, product_id, status)
          VALUES ('${orderId}', '${userID}', '${customerName}', '${productName}', '${productPrices}', '${address}', '${contact}', '${paymentMethod}', '${productId}', 'Ongoing')
        `);
      }
    
      return res.json({ success: true, message: 'Order successfully' });
}

export const deliverItems = async (req, res) => {
    const { userID, selectedProductIds } = req.body;

    if (!selectedProductIds || selectedProductIds.length === 0) {
        return res.json({ success: false, message: 'No items selected.' });
    }

    try {
        // Update each product_id individually
        for (const productId of selectedProductIds) {
            await client.query(
                `UPDATE shopping_cart 
                 SET status = 'Deliver' 
                 WHERE user_id = $1 AND product_id = $2`,
                [userID, productId]
            );
        }

        return res.json({ success: true, message: 'Selected items updated to "Order"' });
    } catch (error) {
        console.error('Error updating items:', error);
        return res.json({ success: false, message: 'Error updating items', error });
    }
};

//PIZZA
export const addPizza = async (req,res) => {
    const userID = req.params.userId
    const { details, price } = req.body
    const addPizza = await client.query(`INSERT INTO shopping_cart (user_id, status, name, price, image_name, amount) VALUES ('${userID}', 'Cart', '${details}', '${price}', 'a.png', '1') RETURNING *`);
    if (addPizza.rowCount > 0) {
        return res.json({ success: true, message: 'Cart added successfully', user: addPizza.rows[0] });
    } else {
        return res.json({ success: false, message: 'Cart addition failed' });
    }
}


//PROFILES
export const displayUser = async (req,res) =>{
    const userID = req.params.userId
    const orders = await  client.query(`SELECT DISTINCT order_id FROM orders_list WHERE customer_id = '${userID}'`);
    if(orders.rows.length === 0){
        return res.json({ success: false, message: 'Nothing were saved'});
    }

    return res.json(orders);
}

export const displayOrders = async (req,res) =>{
    const userID = req.params.userId
    const orderID = req.params.orderId
    const orders = await  client.query(`SELECT * FROM orders_list WHERE customer_id = '${userID}' AND order_id = '${orderID}'`);
    if(orders.rows.length === 0){
        return res.json({ success: false, message: 'Nothing were saved'});
    }

    return res.json(orders);
}