const express = require("express");
const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    getBook,
    getPublishedBooks,
} = require("../controllers/bookControllers");

const router = express.Router();

router.route("/books").get(getAllBooks).post(createBook);
router.route("/books/:id").patch(updateBook).delete(deleteBook).get(getBook);
router.route("/books/published").get(getPublishedBooks);

module.exports = router;
