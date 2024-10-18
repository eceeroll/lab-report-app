import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User";

const verifyUser: VerifyFunction = async (
  email: string,
  password: string,
  done: (err: any, user?: any, info?: any) => void
) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "Geçersiz email veya şifre." });
    }
    //   parola kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Parola hatalı" });
    }
    // Başarılı giriş durumunda kullanıcıyı döndür
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, verifyUser));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
