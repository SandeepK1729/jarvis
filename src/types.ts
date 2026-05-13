import { ChildProcess } from "child_process";
import { Command } from "commander";

interface Alias {
  /**
   * The name of the alias
   * @example "ls"
   * @example "use java"
   */
  alias: string;

  /**
   * The command that the alias runs
   * @example "ls -la"
   * @example "java -jar myapp.jar"
   */
  command: string;

  /**
   * The working directory for the alias
   * @example "/home/user/projects/myapp"
   */
  path: string | undefined;

  /**
   * A brief description of the alias
   * @example "List all files"
   * @example "Run my Java application"
   */
  description?: string;

  /** Number of times the alias has been used */
  count?: number;
}

/** Interface for the database */
interface IData {
  jarvis: {
    [key: string]: Alias
  }
}

/** Context passed to plugins during registration */
interface JarvisContext {
  /** Datasource methods for managing aliases */
  datasources: {
    getAllAliases: () => Record<string, Alias>;
    findAliasByName: (name: string) => Alias | undefined;
    addAlias: (alias: Alias) => Alias;
    deleteAliasByNames: (names: string[]) => void;
    incrementAliasUsage: (name: string) => void;
  };

  /** Utility methods for plugins */
  util: {
    aliasInput: () => Promise<Alias>;
    logAliasRun: (alias: Alias, childProcess: ChildProcess) => void;
    selectAliasToDelete: (list: Alias[]) => Promise<string[]>;
  };
}

/** Interface for Jarvis plugins */
interface JarvisPlugin {
  name: string;
  description?: string;
  register: (cli: Command, context: JarvisContext) => void | Promise<void>;
}

export { Alias, IData, JarvisContext, JarvisPlugin };
