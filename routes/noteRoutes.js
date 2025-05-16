import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteByTitle,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateNoteData } from "../middleware/noteMiddleware.js";
const router = express.Router();

// Authentication for all routers
router.use(authMiddleware);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Bad request
 *
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */

// Create new note
router.post("/", validateNoteData, createNote);

// Get all notes
router.get("/", getNotes);

// Update note
router.put("/:id", validateNoteData, updateNote);

// Delete note
router.delete("/:id", deleteNote);

// Search for note by title
router.get("/search", getNoteByTitle);

export default router;
