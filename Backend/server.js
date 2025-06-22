
// import express from "express";
// import dotenv from "dotenv";
// import databaseConnection from "./utils/database.js";
// import cookieParser from "cookie-parser";
// import userRoute from "./routes/userRoute.js";
// import cors from "cors";

// dotenv.config({
//     path: ".env"
// });

// databaseConnection();

// const app = express();

// // Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // const corsOptions = {
// //     origin: 'https://alok-netflix-clone.onrender.com', // Or your deployed frontend URL
// //     credentials: true
// // };

// const corsOptions = {
//     origin: ['http://localhost:3000', 'https://alok-netflix-clone.vercel.app'],
//     credentials: true
//   };

// app.use(cors(corsOptions));

// // Routes
// app.use("/api/v1/user", userRoute);


// app.get("/", (req, res) => {
//     res.status(200).send("✅ Netflix Backend is Live and Safe!");
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Sonakshi is listen at port ${process.env.PORT}`);
// });





import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

dotenv.config({ path: ".env" });

databaseConnection();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Robust CORS config
const allowedOrigins = [
  'http://localhost:3000',
  'https://alok-netflix-clone.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).send("✅ Netflix Backend is Live and Safe!");
});

app.listen(process.env.PORT, () => {
  console.log(`Sonakshi is listen at port ${process.env.PORT}`);
});
