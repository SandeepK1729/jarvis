import { Alias, Data } from "../types";
import { JSONFileSyncPreset } from "lowdb/node";

interface IData {
  jarvis: {
    [key: string]: Alias
  }
}
const db = JSONFileSyncPreset<IData>("db.json", {
  jarvis: {},
});

/**
 * Get all command aliases.
 * @returns A list of all command aliases.
 */
export const getAllAliases = (): Alias[] => Object.values(db.data.jarvis);

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

/**
 * Delete a command alias.
 * @param alias The alias object to delete.
 */
export const deleteAlias = (alias: Alias): void => {
  db.update(({ jarvis }) => {
    delete jarvis[alias.alias];
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
