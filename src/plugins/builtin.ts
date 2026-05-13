import { JarvisPlugin } from "@/types";
import aliasPlugin from "./alias";
import removePlugin from "./remove";
import listPlugin from "./list";
import runPlugin from "./run";

/** Array of built-in plugins to be registered with Jarvis */
const builtinPlugins: JarvisPlugin[] = [
  aliasPlugin,
  removePlugin,
  listPlugin,
  runPlugin,
];

export default builtinPlugins;
