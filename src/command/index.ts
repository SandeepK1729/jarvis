import { Command } from "commander";
import {
  spawn,
  SpawnOptions,
} from "child_process";
import { spinner } from "@clack/prompts";

import { getAliases, addAlias } from "@/datasources";
import { Alias } from "@/types";
import { aliasInput } from "../util/";

const jarvis = new Command();

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
// 3. list aliases
jarvis
  .command("list")
  .description("List all aliases")
  .action(() => {
    const aliases = getAliases();
    console.table(aliases);
  });

// 4. run alias
jarvis
  .argument("<string...>", "alias command")
  .description("used to run alias commands")
  // .option('-d, --debug', 'run command in debug mode')
  .option("-s, --silent", "run command silently")
  .action((args: string[], options) => {
    console.debug(`With args: `, args, typeof args);

    const tool = args[0];
    const commandArgs = args.slice(1);

    if (!tool) {
      console.error("Please provide a tool to run.");
      process.exit(1);
    }

    const execOptions: SpawnOptions = options.silent
      ? { stdio: undefined }
      : { stdio: "inherit" };
    spawn(tool, commandArgs, execOptions);
  });

jarvis
  .command("run")
  .argument("<string...>", "command to run")
  .action((command: string[]) => {
    console.log("Running command:", command.join(" "));
    if (command.length < 2) {
      console.error("Please provide a command to run.");
      process.exit(1);
    }
    const tool = command[0];
    const args = command.slice(1);

    if (!tool) {
      console.error("Please provide a tool to run.");
      process.exit(1);
    }

    spawn(tool, args, { stdio: "inherit" });
  });

jarvis
  .command("join")
  .description("Join the command-arguments into a single string")
  .argument("<strings...>", "one or more strings")
  .option("-s, --separator <char>", "separator character", ",")
  .action((strings, options) => {
    console.log(strings, typeof strings);
    // console.table(strings);
    console.log(strings.join(options.separator));
  });

export default jarvis;

