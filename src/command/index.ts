import { spawn, SpawnOptions } from "child_process";
import { Command } from "commander";
import { spinner } from "@clack/prompts";

import {
  getAllAliases,
  findAliasByName,
  addAlias,
  deleteAliasByNames,
  incrementAliasUsage,
} from "@/datasources";
import { aliasInput, logAliasRun, selectAliasToDelete } from "@/util";
import { Alias } from "@/types";
import pkg from '../../package.json';

const jarvis = new Command();

jarvis
  .name('jarvis')
  .description(pkg.description)
  .version(pkg.version); // <-- Dynamically injected

// 1. add alias
jarvis
  .command("alias")
  .description("Add a new alias")
  .action(async () => {
    const alias: Alias = await aliasInput();

    const s = spinner();
    s.start(`Adding alias '${alias}'...`);

    const result = addAlias(alias);
    s.stop(`Added alias '${result.alias}' to run command: '${result.command}'`);
  });

// 2. remove alias
jarvis
  .command("remove")
  .description("Remove an existing alias")
  .action(async () => {
    const aliases = getAllAliases();
    const selected = await selectAliasToDelete(Object.values(aliases));

    if (selected.length === 0) {
      console.log("No aliases selected for removal.");
      return;
    }

    const s = spinner();
    s.start(`Removing alias '${selected.join(", ")}'...`);

    deleteAliasByNames(selected);
    s.stop(`Removed alias '${selected.join(", ")}'`);
  });

// 3. list aliases
jarvis
  .command("list")
  .description("List all aliases")
  .action(() => {
    const aliases = getAllAliases();
    console.table(aliases, ["command", "path"]);
  });

// 4. run alias
jarvis
  .argument("<string...>", "alias command")
  .description("used to run alias commands")
  // .option('-d, --debug', 'run command in debug mode')
  .option("-s, --silent", "run command silently")
  .action((args: string[], options) => {
    const alias = findAliasByName(args.join(" "));

    if (!alias) {
      console.error(`Alias not found: ${args.join(" ")}`);
      process.exit(1);
    }

    const cmd = alias.command.split(" ");

    const tool = cmd[0];
    const commandArgs = cmd.slice(1);

    if (!tool) {
      console.error("Please provide a tool to run.");
      process.exit(1);
    }

    const conditionalExecOptions: SpawnOptions = options.silent
      ? { stdio: undefined }
      : { stdio: "inherit" };

    const otherExecOptions: SpawnOptions = { cwd: alias.path };

    const childProcess = spawn(tool, commandArgs, {
      ...otherExecOptions,
      ...conditionalExecOptions,
    });

    logAliasRun(alias, childProcess);
    incrementAliasUsage(alias.alias);
  });

export default jarvis;
