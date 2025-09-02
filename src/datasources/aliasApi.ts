import { JSONFileSyncPreset } from "lowdb/node";
import path from "path";

import { Alias } from "@/types";

interface IData {
  jarvis: {
    [key: string]: Alias
  }
}

const dbPath = path.join(process.env.HOME || "", ".jarvisrc");
const db = JSONFileSyncPreset<IData>(dbPath, {
  jarvis: {},
});

/**
 * Get all command aliases.
 * @returns A map of aliases.
 */
export const getAllAliases = () => db.data.jarvis;

export const findAliasByName = (name: string): Alias | undefined => {
  return db.data.jarvis[name];
};

/**
 * Add a new command alias.
 * @param alias The alias object to add.
 * @returns The added alias object.
 */
export const addAlias = (alias: Alias): Alias => {
  db.update(({ jarvis }) => {
    jarvis[alias.alias] = alias;
  });

  return alias;
};

export const deleteAliasByNames = (names: string[]) => {
  db.update(({ jarvis }) => {
    names.forEach((name) => {
      delete jarvis[name];
    });
  });
};

/**
 * Flush all command aliases.
 */
export const flushAliases = (): void => {
  db.update(({ jarvis }) => {
    jarvis = {};
  });
};
