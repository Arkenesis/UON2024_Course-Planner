import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookie from 'cookie-parser';
import { register, login, logout, reset_password, setAdmin, removeAdmin, delete_account } from "./controller/user.js";
import { getAboutUs, setAboutUs } from './controller/admin_about_us.js'
import { hasAdmin, hasToken } from './controller/middleware.js';

// Initialize variables
// Load .env config
dotenv.config({ path: './secret/.env' });
const port = 8080;
const frontend_url = "http://localhost:5173"
const app = express();

// export const auth = getAuth();
// Middleware
// Tell browser that the server allows cross-origin request and is able to receive cookie and credentials
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', frontend_url);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Tell server to decode the data from raw data, if not "req.body" become undefined
app.use(bodyParser.urlencoded({ extended: true }));
// Tell server to format the data, if not "req.body" become undefined
app.use(bodyParser.json());
// Enabling the backend server to receive data from frontend server, if not browser will show "cross origin" 
app.use(cors({ origin: frontend_url }))
// Tell server to handle the cookie from raw data, if not "req.cookie" become undefined
app.use(cookie());

// User Route
app.post("/users/register", register);
app.post("/users/login", login);
app.post("/users/logout", logout);
app.post("/users/reset-password", reset_password);
app.post("/users/delete", hasToken, delete_account);
app.post("/users/set-admin", hasToken, hasAdmin, setAdmin);
app.post("/users/remove-admin", hasToken, hasAdmin, removeAdmin);
// AboutUs
app.get("/pages/about-us", getAboutUs);
app.post("/pages/about-us", hasToken, hasAdmin, setAboutUs);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
