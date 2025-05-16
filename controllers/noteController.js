import {
  createNote as createNoteModel,
  findNotesByUserId,
  updateNoteById,
  deleteNoteById,
  findNoteByTitle,
} from "../models/noteModel.js";

// Create a new note
export const createNote = (req, res) => {
  const { title, text } = req.body;
  const userId = req.user.id;

  if (!title || !text) {
    return res.status(400).json({ message: "Title and text are required." });
  }

  const newNote = { title, text, userId, createdAt: new Date() };

  createNoteModel(newNote, (err, note) => {
    if (err) {
      return res.status(500).json({ message: "Error creating note." });
    }
    res.status(201).json(note);
  });
};

// Get all notes for a user
export const getNotes = (req, res) => {
  const userId = req.user.id;

  findNotesByUserId(userId, (err, notes) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching notes." });
    }
    res.status(200).json(notes);
  });
};

// Get note by title
export const getNoteByTitle = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(404).json({ message: "Please enter a title." });
  }

  findNoteByTitle(title, (err, note) => {
    if (!note || note.length === 0) {
      return res
        .status(500)
        .json({ message: "Error fetching note by title.", err });
    }
    res.status(200).json(note);
  });
};

// Update a note
export const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const userId = req.user.id;

  const updates = { title, text, modifiedAt: new Date() };

  updateNoteById(id, userId, updates, (err, numReplaced) => {
    if (err) {
      return res.status(500).json({ message: "Error updating note." });
    }
    if (numReplaced === 0) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note updated successfully." });
  });
};

// Delete a note
export const deleteNote = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  deleteNoteById(id, userId, (err, numRemoved) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting note." });
    }
    if (numRemoved === 0) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note deleted successfully." });
  });
};
