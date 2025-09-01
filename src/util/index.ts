import { Alias } from "@/types";
import { cancel, group, multiselect, text, } from "@clack/prompts";

/**
 * Prompts the user for an alias and command, and returns the result.
 * @returns An object containing the alias and command.
 */
const aliasInput = async () => {
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
        },
        {
          onCancel: () => {
            cancel("Operation cancelled.");
            process.exit(0);
          },
        }
      );

  return { alias: results.alias.trim(), command: results.command.trim() };
}

/**
 * Prompts the user to select aliases to delete.
 * @param list The list of aliases to choose from.
 * @returns The selected aliases.
 */
const selectAliasToDelete = async (list: Alias[]): Promise<string[]> => {
  const selected = await multiselect({
    message: 'Select aliases to delete',
    options: list.map(({ alias, command }) => ({
      value: alias,
      label: alias,
      hint: command,
    })),
    required: true,
  });

  if (typeof selected == "symbol")
    return [];

  return selected; 
};

export { aliasInput, selectAliasToDelete };
