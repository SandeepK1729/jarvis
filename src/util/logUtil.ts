import { Alias } from "@/types";
import { ChildProcess } from "child_process";

/**
 * Logs the details of an alias command execution.
 * @param alias The alias object containing command details.
 */
export const logAliasRun = (alias: Alias, childProcess: ChildProcess) => {
  let message = `
> Running Command:
> ${alias.command}
`;

  if (alias.path) {
    message += `> Path: ${alias.path}
`;
  }

  message += `> PID: ${childProcess.pid}
`;

  console.log(message);
};
