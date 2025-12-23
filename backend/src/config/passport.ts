import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken: any, refreshToken: any, profile: any, done: any) => {
    return done(null, profile);
}))

passport.serializeUser((user: any, done: any) => {
    done(null, user);
})

passport.deserializeUser((user: any, done: any) => {
    done(null, user);
})

export default passport