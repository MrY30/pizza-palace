import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

//IMPORT BACKEND
import {checkLogIn, displayProducts} from './backend/admin-page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define the port
const port = 3000;

//DEFINE MIDDLEWARE
app.use(express.json());

app.post('/admin/login', checkLogIn);
// app.post('/admin/login', hashPassword);

app.get('/admin/products', displayProducts);

// Serve static files from the 'public' directory
app.use('/styles',express.static(path.join(__dirname, '/styles')));
app.use('/scripts',express.static(path.join(__dirname, '/scripts')));
app.use('/img',express.static(path.join(__dirname, '/img')));

// Root route
app.get("/", (req, res) => {
  res.send("Hello Pizza Palace!!!");
});

// Serve the /pizza HTML file
app.get("/pizza", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'createPizza.html'));
});

// Serve the /admin HTML file
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, '/pages', 'adminPage.html'));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  console.log(`Enter: http://localhost:${port}/admin`);
});
