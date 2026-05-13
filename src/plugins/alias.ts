import { spinner } from "@clack/prompts";
import { JarvisPlugin } from "@/types";
import { Alias } from "@/types";

const aliasPlugin: JarvisPlugin = {
  name: "alias",
  description: "Add a new alias",
  register(cli, context) {
    cli
      .command("alias")
      .description("Add a new alias")
      .action(async () => {
        const alias: Alias = await context.util.aliasInput();

        const s = spinner();
        s.start(`Adding alias '${alias.alias}'...`);

        const result = context.datasources.addAlias(alias);
        s.stop(`Added alias '${result.alias}' to run command: '${result.command}'`);
      });
  },
};

export default aliasPlugin;
