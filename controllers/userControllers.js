
import User from "../model/user.js";
import passport from "passport";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password); // only registers, no login
    res.status(201).json({ message: "User registered", user: registeredUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Manually log the user in
    req.logIn(user, (err) => {
      if (err) return next(err);

      // Destructure only safe fields
      const { _id, username, email } = user;
      return res.status(200).json({
        message: "Login successful",
        user: { _id, username, email }
      });
    });
  })(req, res, next);
};
