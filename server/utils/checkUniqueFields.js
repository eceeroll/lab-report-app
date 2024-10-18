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
exports.checkUniqueFields = void 0;
const User_1 = __importDefault(require("../models/User"));
const checkUniqueFields = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, tc_no, username, }) {
    const existingEmail = yield User_1.default.findOne({ email });
    if (existingEmail) {
        return { status: 400, message: "Bu E-Posta adresi sisteme kayıtlı!" };
    }
    const existingTcNo = yield User_1.default.findOne({ tc_no });
    if (existingTcNo) {
        return { status: 400, message: "Bu TC Kimlik Numarası sisteme kayıtlı!" };
    }
    const existingUsername = yield User_1.default.findOne({ username });
    if (existingUsername) {
        return { status: 400, message: "Bu kullanıcı adı daha önceden alınmış!" };
    }
    return null;
});
exports.checkUniqueFields = checkUniqueFields;
