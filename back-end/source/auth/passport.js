import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../model/User.js";

// Load environment variables from a .env file
dotenv.config();

// Google OAuth Strategy
// This strategy is used to authenticate users using their Google account.
// It requires a client ID and a client secret, which can be obtained by
// creating a new project in the Google Developers Console.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // This is the same URL that you specified in the Google Developers
      // Console. It is critical that you use the same URL here.
      callbackURL: "/auth/google/callback",
    },

    // This is the function that is called when a user is successfully
    // authenticated with Google. The user's profile information is
    // passed to this function, and the function should either create
    // a new user in the database or retrieve an existing user.
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          role: "admin",
        });
      }
      done(null, user);
    }
  )
);

// This function is called when a user is successfully authenticated with
// Google. It serializes the user's ID and passes it to the done callback.
// The ID is stored in the session and is used to retrieve the user object
// in subsequent requests.
passport.serializeUser((user, done) => done(null, user.id));

// This function is called to retrieve the user object from the session.
// It deserializes the user's ID and passes it to the done callback. The
// user object is then available in the req.user property in the request
// handler.
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

export default passport;