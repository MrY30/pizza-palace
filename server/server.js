import express from "express";
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

//IMPORT BACKEND
import {checkLogIn, displayProducts, addProduct, checkCustomer, newUser, getData, displayCart, addCart, deleteCart, orderCart, displayOrder, addOrder} from './backend/admin-page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define the port
const port = 3000;

//DEFINE MIDDLEWARE
app.use(express.json());
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//MULTER IMAGE
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/admin/login', checkLogIn);
app.post('/admin/upload', upload.single('image'), addProduct);
app.get('/admin/products', displayProducts);
app.get('/admin/deliveries', (req,res)=>{}); //TO EDIT

app.post('/login/login', checkCustomer);
app.post('/login/signup', newUser);

//CARTS
app.get('/cart/:userId', displayCart)
app.post('/cart/:userId', addCart)
app.delete('/cart/:userId/:productId', deleteCart)
app.put('/cart/order', orderCart)

//ORDERS
app.get('/order/:userId', displayOrder)
app.post('/order/:userId', addOrder)

app.get('/getUserData', getData)

// Serve static files from the 'public' directory
app.use('/styles',express.static(path.join(__dirname, '/styles')));
app.use('/scripts',express.static(path.join(__dirname, '/scripts')));
app.use('/img',express.static(path.join(__dirname, '/img')));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'homePage.html'));
});

// Serve the /pizza HTML file
app.get("/pizza", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'createPizza.html'));
});

// Serve the /admin HTML file
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'adminPage.html'));
});

// Serve the /login HTML file
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'loginPage.html'));
});

// Serve the /order HTML file
app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'orderPage.html'));
});

// Serve the /profile HTML file
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'profilePage.html'));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  console.log(`Enter: http://localhost:${port}/admin`);
});