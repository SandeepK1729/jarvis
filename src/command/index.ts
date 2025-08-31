import { Command } from 'commander';

const jarvis = new Command();

// jarvis
//     .name(pkg.name)
//     .description(pkg.description)
//     .version(pkg.version);

jarvis
    .name('jarvis')
    .description('A CLI tool for creating custom command aliases')
    .version('0.0.1');

// Define your commands here
jarvis
  .argument('<name>', 'name to greet')
  .description('Greet the specified user')
  .action((name: string) => {
      console.log(`Hello, ${name}!`);
  });

export default jarvis;
