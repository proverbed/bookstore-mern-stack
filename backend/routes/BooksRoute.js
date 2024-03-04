import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

const router = express.Router();

/**
 * Add a book
 */
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // 400: Bad Request
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    // 500: Internal Server Error
    response.status(500).send({
      message: error.message,
    });
  }
});

/**
 * Get all books
 */
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    // 200: Success
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

/**
 * Get a books by id
 */
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

/**
 * Update a books by id
 */
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      // 400: Bad Request
      return response.status(400).send({
        message:
          "Bad Request, Send all required fields: title, author, publishYear and valid ID.",
      });
    }
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      // 400: Missing Resource
      return response.status(404).json({
        message: "Book not found",
      });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

/**
 * Delete a books by id
 */
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
