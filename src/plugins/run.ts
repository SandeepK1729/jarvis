import { spawn, SpawnOptions, ChildProcess } from "child_process";
import { JarvisPlugin } from "@/types";

const runPlugin: JarvisPlugin = {
  name: "run",
  description: "Run an alias command",
  register(cli, context) {
    cli
      .argument("<alias...>", "alias command")
      .description("Run an alias command")
      .option("-s, --silent", "run command silently")
      .action((args: string[], options: { silent?: boolean }) => {
        const alias = context.datasources.findAliasByName(args.join(" "));

        if (!alias) {
          console.error("Alias not found");
          process.exit(1);
        }

        const cmd = alias.command.split(" ");
        const tool = cmd[0];
        const commandArgs = cmd.slice(1);

        if (!tool) {
          console.error("No command found to execute.");
          process.exit(1);
        }

        const conditionalExecOptions: SpawnOptions = options.silent
          ? { stdio: undefined }
          : { stdio: "inherit" };

        const otherExecOptions: SpawnOptions = { cwd: alias.path };

        const childProcess: ChildProcess = spawn(tool, commandArgs, {
          ...otherExecOptions,
          ...conditionalExecOptions,
        });

        context.util.logAliasRun(alias, childProcess);
        context.datasources.incrementAliasUsage(alias.alias);
      });
  },
};

export default runPlugin;
