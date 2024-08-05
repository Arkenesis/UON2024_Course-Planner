import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookie from 'cookie-parser';
import { register, login, logout, reset_password, setAdmin, removeAdmin, delete_account } from "./controller/user.js";
import { getAboutUs, setAboutUs } from './controller/admin_about_us.js'
import { getTermsAndConditions, setTermsAndConditions } from './controller/admin_terms_and_conditions.js'
import { hasAdmin, hasToken, upload} from './controller/middleware.js';
import { getPolicy, setPolicy } from './controller/admin_policy.js';
import { getNavigation, setNavigation } from './controller/admin_navigation.js';
import { getFiles, uploadFiles } from './controller/image_upload.js';
import { deleteCourse, getCourses, setCourse } from './controller/admin_courses.js';
import { getUsers, removeUser, setUser } from './controller/admin_users.js';
import { createProgram, deleteProgram, getProgram, getPrograms, initPrograms, setProgram } from './controller/admin_programs.js';
import { setProfile, setProfileCourses } from './controller/user_profile.js';
import { getFooter, setFooter } from './controller/admin_footer.js';
import { getLogin, setLogin } from './controller/admin_login.js';
import { getRegister, setRegister } from './controller/admin_register.js';

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
// app.use(cors({ origin: frontend_url }))
app.use(cors({ origin: frontend_url }))
// Tell server to handle the cookie from raw data, if not "req.cookie" become undefined
app.use(cookie());

// User Route
app.post("/api/users/register", register);
app.post("/api/users/login", login);
app.post("/api/users/logout", logout);
app.post("/api/users/reset-password", reset_password);
app.post("/api/users/delete", hasToken, delete_account);
app.post("/api/users/set-admin", hasToken, hasAdmin, setAdmin);
app.post("/api/users/remove-admin", hasToken, hasAdmin, removeAdmin);
// AboutUs
app.get("/api/pages/about-us/", getAboutUs);
app.post("/api/pages/about-us", hasToken, hasAdmin, setAboutUs);
// Terms and Conditions
app.get("/api/pages/terms-and-conditions", getTermsAndConditions);
app.post("/api/pages/terms-and-conditions", hasToken, hasAdmin, setTermsAndConditions);
// Policy
app.get("/api/pages/policy", getPolicy);
app.post("/api/pages/policy", hasToken, hasAdmin, setPolicy);
// Navigation
app.get("/api/pages/navigation", getNavigation);
app.post("/api/pages/navigation", hasToken, hasAdmin, setNavigation);
// Image Upload
app.get("/api/pages/image-upload", getFiles);
app.post("/api/pages/image-upload", hasToken, hasAdmin, upload.array('files', 10), uploadFiles);
// Edit Courses
app.get("/api/pages/courses", getCourses);
app.post("/api/pages/courses", hasToken, hasAdmin, setCourse);
app.post("/api/pages/delete-courses", hasToken, hasAdmin, deleteCourse);
// Edit Courses
app.get("/api/pages/users", getUsers);
app.post("/api/pages/users", hasToken, hasAdmin, setUser);
app.post("/api/pages/delete-users", hasToken, hasAdmin, removeUser);
// Edit Program
app.get("/api/pages/program", getProgram);
app.post("/api/pages/create-program", hasToken, hasAdmin, createProgram);
app.post("/api/pages/delete-program", hasToken, hasAdmin, deleteProgram);
app.get("/api/pages/programs", getPrograms);
app.post("/api/pages/programs", hasToken, hasAdmin, setProgram);
// Profile
app.post("/api/pages/profile", hasToken, setProfile);
app.post("/api/pages/profile-courses", hasToken, setProfileCourses);
// Footer
app.get("/api/pages/footer", getFooter);
app.post("/api/pages/footer", hasToken, hasToken, hasAdmin, setFooter);
// Login
app.get("/api/pages/login", getLogin);
app.post("/api/pages/login", hasToken, hasToken, hasAdmin, setLogin);
// Register
app.get("/api/pages/register", getRegister);
app.post("/api/pages/register", hasToken, hasToken, hasAdmin, setRegister);
// app.get("/pages/homepage", (req, res) => {
//   console.log(req);
//   console.log(res);
//   return res.json({ message: "hi"});
// });

// Start the server
// Seed
await initPrograms();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
