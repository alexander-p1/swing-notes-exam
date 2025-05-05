import { findNotesByUserId } from "../models/noteModel.js";

// Middleware to validate req.body
export const validateNoteData = (req, res, next) => {
  console.log("ValidateNoteData middleware triggered");
  const { title, text } = req.body;
  const maxTitleLength = 50;
  const maxTextLength = 300;

  if (!title || !text) {
    return res.status(400).json({ message: "Title and text required" });
  }

  if (title.length > maxTitleLength) {
    return res.status(400).json({
      message: `Title cant be more than ${maxTitleLength} characters.`,
    });
  }

  if (text.length > maxTextLength) {
    return res
      .status(400)
      .json({ message: `Text cant be more than ${maxTextLength} characters` });
  }
  next();
};

// Check if note exists
export const checkIfNoteExist = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  findNotesByUserId(userId, (err, notes) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching notes" });
    }

    const note = notes.find((note) => note._id === id);

    if (!note) {
      return res.status(400).json({ message: "Note not found " });
    }

    req.note = note;
    next();
  });
};
