import path from "path";

const { HOME = "", JARVIS_HOME } = process.env;

/**
 * Path to the database file
 * This is where the command aliases are stored.
 * @description if $JARVIS_HOME is set, use it; otherwise, fall back to $HOME for .jarvisrc
 */
const dbPath = path.join(JARVIS_HOME || HOME, ".jarvisrc");

export { dbPath };
