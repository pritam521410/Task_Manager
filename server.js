import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import taskRoute from "./route/taskRoute.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./model/user.js";
import userRoute from "./route/userRoute.js";
import session from "express-session";

dotenv.config();
const app = express();

// ✅ Add express-session middleware BEFORE passport.session()
app.use(session({
  secret: "mySecretKey", // You can replace with process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// ✅ Initialize passport after session middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Configure passport-local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional for forms

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use("/api", taskRoute);
app.use("/api", userRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
