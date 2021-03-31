const Book = require("../models/Book");
const AsyncManager = require("../utils/asyncManager");
const LibraryError = require("../utils/libraryError");

// $-title   Create a Book
// $-path    POST /api/v1/books
// $-auth    Public
exports.createBook = AsyncManager(async (req, res, next) => {
    const newbook = await Book.create(req.body);
    return res.status(201).json(newbook);
});

// $-title   Get all Books
// $-path    GET /api/v1/books
// $-auth    Public
exports.getAllBooks = AsyncManager(async (req, res, next) => {
    const books = await Book.find();
    return res.status(200).json(books);
});

// $-title   Get Single Book
// $-path    GET /api/v1/books/:id
// $-auth    Public
exports.getBook = AsyncManager(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new LibraryError(`That book is not available`, 404));
    }
    return res.status(200).json(book);
});

// $-title   Get Published Books
// $-path    POST /api/v1/books/published
// $-auth    Public
exports.getPublishedBooks = AsyncManager(async (req, res, next) => {
    const books = await Book.find({ published: true });
    return res.status(200).json(books);
});

// $-title   Update Book
// $-path    PATCH /api/v1/books/:id
// $-auth    Public
exports.updateBook = AsyncManager(async (req, res, next) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
        return next(new LibraryError(`That book is not available`, 404));
    }

    book = await Book.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    return res.status(200).json(book);
});

// $-title   Delete Book
// $-path    DELETE /api/v1/books/:id
// $-auth    Public
exports.deleteBook = AsyncManager(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new LibraryError(`That book is not available`, 404));
    }

    await book.remove();
    return res.status(200).json({ message: "The book has been deleted" });
});
