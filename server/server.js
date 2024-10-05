import express from "express";
 
const app = express();
 
// define the port
const port = 3000;
 
app.get("/", (req, res) => {
  res.send("Hello Pizza Palace!!!");
});
 
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});