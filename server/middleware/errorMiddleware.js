const LibraryError = require("../utils/libraryError");

const mongooseErrorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (err.name === "CastError") {
        const message = `invalid ${err.path}: ${err.value}. This resource doesn't exist`;
        error = new LibraryError(message, 404);
    }

    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please enter another value`;
        error = new LibraryError(message, 400);
    }

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((val) => val.message);
        const message = `Invalid data provided. ${errors.join(". ")}`;
        error = new LibraryError(message, 400);
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        error,
        message: error.message,
    });
};

module.exports = mongooseErrorHandler;
