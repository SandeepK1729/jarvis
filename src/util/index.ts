import { cancel, group, text, } from "@clack/prompts";

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

export { aliasInput };
