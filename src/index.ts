#! /usr/bin/env node
import command from './command';

// If no args are provided, show help
if (!process.argv.slice(2).length) {
  command.outputHelp();
  process.exit(0);
}

// Execute the CLI
command.parse(process.argv);
