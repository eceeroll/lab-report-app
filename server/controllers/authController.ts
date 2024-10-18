import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

import { IUser } from "../models/User";
import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils/hashPassword";
import { checkUniqueFields } from "../utils/checkUniqueFields";
import { getRoleId } from "../utils/getRoleId";
import { generateUniqueId } from "../utils/generateUniqueId";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, tc_no, username, roleName } =
      req.body;

    // Parola hashleme
    const hashedPassword = await hashPassword(password);

    // Rol Belirleme
    const roleResult = await getRoleId(roleName);
    if (roleResult.status) {
      return res
        .status(roleResult.status)
        .json({ message: roleResult.message });
    }

    console.log("role result:", roleResult);

    const roleId = roleResult.roleId;

    const role = await Role.findById(roleId);

    // Email Tc veya Username kayıtlı mı kontrolü
    const resultCheckUniqueFields = await checkUniqueFields({
      email,
      tc_no,
      username,
    });
    if (resultCheckUniqueFields) {
      return res
        .status(resultCheckUniqueFields.status)
        .json({ message: resultCheckUniqueFields.message });
    }

    const userData: any = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      tc_no,
      username,
      role: roleId,
    };

    if (role?.name === "user") {
      console.log("role user");
      userData.laborantId = await generateUniqueId(7);
    }

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: "Kullanıcı oluşturuldu", newUser });
  } catch (error: any) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: any, user: IUser, info: { message: any }) => {
      if (err) return next(err);

      if (!user)
        return res
          .status(401)
          .json({ message: info.message || "Giriş Başarısız" });

      try {
        // generate token
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
            laborantInfo: {
              id: user.laborantId,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          },
          process.env.JWT_SECRET!,
          { expiresIn: "72h" }
        );
        return res.status(200).json({ message: "Giriş Başarılı", token, user });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};
