import { Command } from "commander";
import pkg from "../../package.json";

import * as datasources from "@/datasources";
import * as util from "@/util";
import { registerPlugins } from "@/loader";
import builtin from "@/plugins/builtin";

const jarvis = new Command();

jarvis
  .name("jarvis")
  .description(pkg.description)
  .version(pkg.version);

const context = {
  datasources,
  util,
};

// Built-in plugins are all synchronous; registerPlugins is called async-safely via the exported promise.
const ready = registerPlugins(jarvis, context, builtin);

export { ready };
export default jarvis;
