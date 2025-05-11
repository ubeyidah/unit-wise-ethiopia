import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import { config } from "dotenv";
import { nanoid } from "nanoid";
import { signinSchema } from "../schemas/auth.schema.js";

config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const fullName = `${profile.name.givenName} ${
          profile.name.familyName || ""
        }`;
        const email = profile.emails[0].value;
        const profileImage = profile.photos[0].value;
        const userName = await extractUserName(email);
        const { error } = signinSchema.validate({
          fullName,
          userName,
          email,
          profileImage,
        });
        if (error) {
          done(error, null);
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            userName,
            fullName,
            email,
            profileImage,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

async function extractUserName(email) {
  try {
    let userName = email.split("@")[0];
    const isUserNotUniqe = await User.findOne({ userName });
    if (isUserNotUniqe) {
      const suffix = nanoid().substring(0, 5);
      userName = userName + suffix;
    }
    return userName;
  } catch (error) {
    console.log("Failed to extract user name" + error.message);
  }
}

export default passport;
