import { Alias } from "@/types";
import { cancel, group, multiselect, text } from "@clack/prompts";
import { isValidDirectory } from "./pathUtil";

/**
 * Prompts the user for an alias and command, and returns the result.
 * @returns An object containing the alias and command.
 */
export const aliasInput = async (): Promise<Alias> => {
  const results = await group(
    {
      command: () =>
        text({
          message: "What is the command to alias?",
          validate: (value: string | undefined) => {
            if (!value) return "Command cannot be empty.";

            const trimmedValue = value.trim();

            if (trimmedValue === "") {
              return "Command cannot be empty.";
            }

            if (["alias", "run", "remove"].includes(trimmedValue)) {
              return `Command '${trimmedValue}' is already aliased. Choose another name.`;
            }

            return undefined;
          },
        }),
      alias: () =>
        text({
          message: `What is the alias command ?`,
          validate: (value: string | undefined) => {
            if (!value) return "Alias cannot be empty.";

            const trimmedValue = value.trim();

            if (trimmedValue === "") {
              return "Alias cannot be empty.";
            }

            if (["alias", "run", "remove"].includes(trimmedValue)) {
              return `Alias '${trimmedValue}' is already taken. Choose another name.`;
            }

            return undefined;
          },
        }),
      path: () =>
        text({
          message: `Is there any specific path for the command run? (Optional - It will run in the current directory if not specified)`,
          placeholder: "Press enter to skip",
          validate: (value: string) => {
            if (value) {
              if (!isValidDirectory(value)) {
                return "Invalid directory path.";
              }
            }
            return undefined;
          }
        }),
    },
    {
      onCancel: () => {
        cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  const trimmedResults = {
    alias: results.alias.trim(),
    command: results.command.trim(),
    path: results.path.trim() === '' ? undefined : results.path.trim(),
  };

  return trimmedResults;
};

/**
 * Prompts the user to select aliases to delete.
 * @param list The list of aliases to choose from.
 * @returns The selected aliases.
 */
export const selectAliasToDelete = async (list: Alias[]): Promise<string[]> => {
  const selected = await multiselect({
    message: "Select aliases to delete",
    options: list.map(({ alias, command }) => ({
      value: alias,
      label: alias,
      hint: command,
    })),
    required: true,
  });

  if (typeof selected == "symbol") return [];

  return selected;
};
