import * as newrelic from "newrelic"; // TypeScript'te require yerine import * as kullanın
import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import reportRoutes from "./routes/reportRoutes";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*"); //LINE 5

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Pass to next layer of middleware
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((error: Error) => console.error("MongoDB connection error:", error));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = file.originalname.split(".").pop();
//     cb(null, `reportImage-${uniqueSuffix}.${extension}`);
//   },
// });

// Filter for allowed file types
// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// app.post("/api/upload", upload.single("reportImage"), function (req, res) {
//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ error: "No file uploaded or invalid file type." });
//   }
// Successful upload response
//   res.status(200).json({
//     message: "File uploaded successfully!",
//     file: {
//       filename: req.file.filename,
//       path: req.file.path,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//     },
//   });
// });
