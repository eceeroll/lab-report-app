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
exports.generateUniqueId = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const Report_1 = __importDefault(require("../models/Report"));
const generateUniqueId = (length) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = new short_unique_id_1.default({ length, dictionary: "number" });
    let newFileNumber;
    let isUnique = false;
    do {
        newFileNumber = uid.rnd();
        const existingReport = yield Report_1.default.findOne({ fileNumber: newFileNumber });
        if (!existingReport) {
            isUnique = true;
        }
    } while (!isUnique);
    return newFileNumber;
});
exports.generateUniqueId = generateUniqueId;
