import Datastore from "nedb";
import dotenv from "dotenv";

dotenv.config();

// Init NeDB for users
const noteDB = new Datastore({
  filename: process.env.NOTE_DB_PATH,
  autoload: true,
});

// Create new note
export const createNote = (note, callback) => {
  noteDB.insert(note, callback);
};

// Find notes by user
export const findNotesByUserId = (userId, callback) => {
  noteDB.find({ userId }, callback);
};

// Update note by id
export const updateNoteById = (id, userId, updates, callback) => {
  noteDB.update({ _id: id, userId }, { $set: updates }, {}, callback);
};

// Delete a note
export const deleteNoteById = (id, userId, callback) => {
  noteDB.remove({ _id: id, userId }, {}, callback);
};
