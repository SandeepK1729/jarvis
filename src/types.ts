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

export { Alias, IData };
