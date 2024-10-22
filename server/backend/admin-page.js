import connectToDatabase from './dbConnection.js';
import { supabase } from './dbConnection.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

const { client } = connectToDatabase;

export const checkLogIn = async (req,res) =>{
    const { username, password } = req.body;

    const admins = await client.query(`SELECT * FROM users_table WHERE status = 'admin' AND username = '${username}'`);
    
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


//USE THIS TO ADMINS TO CONVERT PASSWORDS TO HASH
export const hashPassword = async (req, res) => {
    //USERNAME: ejMamacos PASSWORD: jeojeojeo
    //USERNAME: lsJardeleza PASSWORD: lykalykalyka
    //USERNAME: glDeocampo PASSWORD: jimsjimsjims

    const name = 'glDeocampo'
    const users = await client.query(`SELECT password FROM users_table WHERE status = 'admin' AND username = '${name}'`);

    console.log(users.rows[0].password);

    const hashedPassword = await bcrypt.hash(users.rows[0].password, 10);

    await client.query(`UPDATE users_table SET password = '${hashedPassword}' WHERE username = '${name}'`)
}

//DISPLAYING PRODUCTS
let filePath
const bucketName = process.env.SUPABASE_BUCKET

export const displayProducts = async (req,res) =>{
    const products = await  client.query(`SELECT * FROM products_list`);
    if(products.rows.length === 0){
        return res.json({ success: false, message: 'Products not Found'});
    }

    const newResult = await Promise.all(products.rows.map(async (product) => {
        const url = await getPublicUrl(bucketName, product.image_name)
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


