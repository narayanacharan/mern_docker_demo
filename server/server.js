require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const ErrorsMiddleware = require("./middleware/errorMiddleware");
const LibraryError = require("./utils/libraryError");
const bookRoutes = require("./routes/bookRoutes");

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);

    process.exit(1);
});

//Initialize the app
const app = express();

connectToDB();

//enable our app to parse JSON
app.use(express.json());

//declare our PORT
const PORT = process.env.PORT || 5000;

//Mount/Create Routes
app.get("/test", (req, res) => {
    res.json({
        Hi: "Welcome to the MERN Library API",
    });
});
app.use("/api/v1/", bookRoutes);

// Error middleware
app.all("*", (req, res, next) => {
    next(
        new LibraryError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});
app.use(ErrorsMiddleware);

// Make the sever listen on the declared PORT variable
const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        // exit code 1 means that there is an issue that caused the program to exit
        process.exit(1);
    });
});
