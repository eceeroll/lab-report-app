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
exports.getRoleId = void 0;
const Role_1 = __importDefault(require("../models/Role"));
const getRoleId = (roleName) => __awaiter(void 0, void 0, void 0, function* () {
    if (roleName) {
        const existingRole = yield Role_1.default.findOne({ name: roleName });
        if (existingRole) {
            return { roleId: existingRole._id.toString() };
        }
        else {
            return { status: 404, message: "Geçersiz Rol" };
        }
    }
    else {
        const defaultRole = yield Role_1.default.findOne({ name: "user" });
        if (defaultRole) {
            return { roleId: defaultRole._id.toString() };
        }
        else {
            return { status: 500, message: "Varsayılan rol hatası" };
        }
    }
});
exports.getRoleId = getRoleId;
