import { JSONFileSyncPreset } from "lowdb/node";

import { dbPath } from "@/config";
import { Alias, IData } from "@/types";

const db = JSONFileSyncPreset<IData>(dbPath, {
  jarvis: {},
});

/**
 * Get all command aliases.
 * @returns A map of aliases.
 */
const getAllAliases = () => db.data.jarvis;

/**
 * Find a command alias by name.
 * @param name The name of the alias to find.
 * @returns The found alias or undefined if not found.
 */
const findAliasByName = (name: string): Alias | undefined => {
  return db.data.jarvis[name];
};

/**
 * Increment the usage count of a command alias.
 * @param name The name of the alias to increment.
 */
const incrementAliasUsage = (name: string): void => {
  db.update(({ jarvis }) => {
    const alias = jarvis[name];
    if (alias) {
      alias.count = (alias.count || 0) + 1;
    }
  });
};

/**
 * Add a new command alias.
 * @param alias The alias object to add.
 * @returns The added alias object.
 */
const addAlias = (alias: Alias): Alias => {
  db.update(({ jarvis }) => {
    jarvis[alias.alias] = { count: 0, ...alias };
  });

  return alias;
};

/**
 * Delete command aliases by their names.
 * @param names The names of the aliases to delete.
 */
const deleteAliasByNames = (names: string[]) => {
  db.update(({ jarvis }) => {
    names.forEach((name) => {
      delete jarvis[name];
    });
  });
};

/**
 * Flush all command aliases.
 */
const flushAliases = (): void => {
  db.update(({ jarvis }) => {
    jarvis = {};
  });
};

export {
  getAllAliases,
  findAliasByName,
  incrementAliasUsage,
  addAlias,
  deleteAliasByNames,
  flushAliases,
};
