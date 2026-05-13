import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { Command } from "commander";
import { JarvisContext, JarvisPlugin } from "@/types";

export const registerPlugins = async (
  cli: Command,
  context: JarvisContext,
  builtinPlugins: JarvisPlugin[],
  pluginsDir?: string,
): Promise<void> => {

  for (const plugin of builtinPlugins) {
    await plugin.register(cli, context);
  }

  if (!pluginsDir || !fs.existsSync(pluginsDir)) return;

  for (const entry of fs.readdirSync(pluginsDir)) {
    const fullPath = path.join(pluginsDir, entry);
    const indexFile = path.join(fullPath, "index.js");

    if (!fs.existsSync(indexFile)) continue;

    try {
      const mod = await import(pathToFileURL(indexFile).href);
      const plugin: JarvisPlugin = mod.default ?? mod.plugin ?? mod;

      if (plugin?.register) {
        await plugin.register(cli, context);
      }
    } catch (error) {
      console.error(`Failed to load plugin '${entry}':`, error);
    }
  }
};
