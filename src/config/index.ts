import path from "path";

/** Path to the database file */
const dbPath = path.join(process.env.HOME || "", ".jarvisrc");

export { dbPath };
