import { Alias } from "@/types";

/**
 * Logs the details of an alias command execution.
 * @param alias The alias object containing command details.
 */
export const logAliasRun = (alias: Alias) => {
  let message = `
> Running alias '${alias.alias}'
> Command: ${alias.command}
`;

  if (alias.path) {
    message += `> Path: ${alias.path}
`;
  }

  console.log(message);
};
