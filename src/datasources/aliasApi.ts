import { Alias, Data } from "../types";
import { LowSync } from "lowdb";
import { JSONFileSyncPreset, JSONFileSync } from "lowdb/node";

console.log("file loaded");
// const db: LowSync<Data> = new LowSync(new JSONFileSync("~/.jarvisdata.json", { aliasL: {} }), {
//   aliases: new Map<string, Alias>(),
// });

interface IData {
  jarvis: {
    [key: string]: Alias
  }
}
const db = JSONFileSyncPreset<IData>("db.json", {
  jarvis: {},
});

console.log("DB initialized:", db.data);
db.read();
console.log("DB after read:", db.data);

// const iterator = db.data.aliases.size + 1;

/**
 * Get all command aliases.
 * @returns A list of all command aliases.
 */
export const getAliases = (): Alias[] => Object.values(db.data.jarvis);

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
