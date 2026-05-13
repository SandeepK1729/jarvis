import { spinner } from "@clack/prompts";
import { JarvisPlugin } from "@/types";

const removePlugin: JarvisPlugin = {
  name: "remove",
  description: "Remove an existing alias",
  register(cli, context) {
    cli
      .command("remove")
      .description("Remove an existing alias")
      .action(async () => {
        const aliases = context.datasources.getAllAliases();
        const selected = await context.util.selectAliasToDelete(Object.values(aliases));

        if (selected.length === 0) {
          console.log("No aliases selected for removal.");
          return;
        }

        const s = spinner();
        s.start(`Removing alias '${selected.join(", ")}'...`);

        context.datasources.deleteAliasByNames(selected);
        s.stop(`Removed alias '${selected.join(", ")}'`);
      });
  },
};

export default removePlugin;
