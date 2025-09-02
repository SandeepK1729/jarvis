import { statSync } from "fs";

/**
 * Checks if a directory path is valid.
 * @param dirPath The directory path to check.
 * @returns True if the directory exists and is valid, false otherwise.
 */
export const isValidDirectory = (dirPath: string): boolean => {
  try {
    return statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
};
