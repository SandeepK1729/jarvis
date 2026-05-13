#! /usr/bin/env node
import command, { ready } from './command';

// Wait for all plugins to register before parsing
ready.then(() => {
  // If no args are provided, show help
  if (!process.argv.slice(2).length) {
    command.outputHelp();
    process.exit(0);
  }

  // Execute the CLI
  command.parse(process.argv);
}).catch((err: unknown) => {
  console.error("Failed to initialize jarvis:", err);
  process.exit(1);
});
