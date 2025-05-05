import Datastore from "nedb";
import dotenv from "dotenv";

dotenv.config();

// Init NeDB for users
const userDB = new Datastore({
  filename: process.env.USER_DB_PATH,
  autoload: true,
});

// Create new user
const createUser = (user, callback) => {
  userDB.insert(user, callback);
};

// Find a user
const findByUsername = (username, callback) => {
  userDB.findOne({ username }, callback);
};

export default { findByUsername, createUser };
