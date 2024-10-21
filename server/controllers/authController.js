"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const hashPassword_1 = require("../utils/hashPassword");
const checkUniqueFields_1 = require("../utils/checkUniqueFields");
const getRoleId_1 = require("../utils/getRoleId");
const generateUniqueId_1 = require("../utils/generateUniqueId");
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, tc_no, username, roleName } = req.body;
        // Parola hashleme
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        // Rol Belirleme
        const roleResult = yield (0, getRoleId_1.getRoleId)(roleName);
        if (roleResult.status) {
            return res
                .status(roleResult.status)
                .json({ message: roleResult.message });
        }
        console.log("role result:", roleResult);
        const roleId = roleResult.roleId;
        const role = yield Role_1.default.findById(roleId);
        // Email Tc veya Username kayıtlı mı kontrolü
        const resultCheckUniqueFields = yield (0, checkUniqueFields_1.checkUniqueFields)({
            email,
            tc_no,
            username,
        });
        if (resultCheckUniqueFields) {
            return res
                .status(resultCheckUniqueFields.status)
                .json({ message: resultCheckUniqueFields.message });
        }
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            tc_no,
            username,
            role: roleId,
        };
        if ((role === null || role === void 0 ? void 0 : role.name) === "user") {
            console.log("role user");
            userData.laborantId = yield (0, generateUniqueId_1.generateUniqueId)(7);
        }
        const newUser = new User_1.default(userData);
        yield newUser.save();
        res.status(201).json({ message: "Kullanıcı oluşturuldu", newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res
                .status(401)
                .json({ message: info.message || "Giriş Başarısız" });
        try {
            // generate token
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                email: user.email,
                role: user.role,
                laborantInfo: {
                    id: user.laborantId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            }, process.env.JWT_SECRET, { expiresIn: "72h" });
            return res.status(200).json({ message: "Giriş Başarılı", token, user });
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
};
exports.loginUser = loginUser;
