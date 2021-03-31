class LibraryError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")
            ? "Client Error"
            : "Server Error";
    }
}

module.exports = LibraryError;
