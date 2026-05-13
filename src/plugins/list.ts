import { JarvisPlugin } from "@/types";

const listPlugin: JarvisPlugin = {
  name: "list",
  description: "List all aliases",
  register(cli, context) {
    cli
      .command("list")
      .description("List all aliases")
      .action(() => {
        const aliases = context.datasources.getAllAliases();
        console.table(aliases, ["command", "path"]);
      });
  },
};

export default listPlugin;
