# Jarvis [![starline](https://starlines.qoo.monster/assets/SandeepK1729/jarvis)](https://github.com/qoomon/starline)

[![CI](https://github.com/SandeepK1729/jarvis/actions/workflows/ci.yml/badge.svg)](https://github.com/SandeepK1729/jarvis/actions/workflows/ci.yml)
[![PR lint](https://github.com/SandeepK1729/jarvis/actions/workflows/pr-lint.yml/badge.svg)](https://github.com/SandeepK1729/jarvis/actions/workflows/pr-lint.yml)
[![Release](https://github.com/SandeepK1729/jarvis/actions/workflows/release.yml/badge.svg)](https://github.com/SandeepK1729/jarvis/actions/workflows/release.yml)

[![NPM Version](https://img.shields.io/npm/v/@sandeepk1729/jarvis.svg)](https://www.npmjs.com/package/@sandeepk1729/jarvis)
[![NPM Downloads](https://img.shields.io/npm/dt/@sandeepk1729/jarvis.svg)](https://www.npmjs.com/package/@sandeepk1729/jarvis)
[![License](https://img.shields.io/npm/l/@sandeepk1729/jarvis.svg)](https://opensource.org/licenses/MIT)

**Jarvis** is a CLI tool and npm package for creating custom command aliases. Instantly turn lengthy or complex shell commands into simple shortcuts, boosting your productivity in the terminal.

---

## Features

- **Add Aliases:** Map any shell command to an easy-to-remember alias, with optional directory path for execution.
- **Remove Aliases:** Delete aliases you no longer need.
- **List Aliases:** View all your defined aliases, including their execution paths.
- **Run Aliases:** Execute commands using your defined shortcuts.
- **Silent Mode:** Run commands without displaying output.

---

## Installation

Install Jarvis globally from npm:

```bash
npm install -g @sandeepk1729/jarvis
```

---

## Usage

### Help

```bash
jarvis --help
```

```
Usage: jarvis [options] [command] <string...>

used to run alias commands

Arguments:
  string        alias command

Options:
  -V, --version  output the version number
  -s, --silent  run command silently
  -h, --help    display help for command

Commands:
  alias         Add a new alias
  remove        Remove an existing alias
  list          List all aliases
```

---

### Adding an Alias

```bash
jarvis alias
```

You will be prompted to enter the command, alias name, and optional execution path.

**Example 1: Development Server Alias**
```
◇  What is the command to alias?
│  npm run dev
│
◇  What is the alias command ?
│  dev
│
◇  Is there any specific path for the command run? (Optional - It will run in the current directory if not specified)
│  /Users/dev/my-react-app
│
◇  Added alias 'dev' to run command: 'npm run dev'
```

**Example 2: Log Search Alias**
```
◇  What is the command to alias?
│  grep -r "ERROR" /var/log/
│
◇  What is the alias command ?
│  find-errors
│
◇  Is there any specific path for the command run? (Optional - It will run in the current directory if not specified)
│  [Press enter to skip]
│
◇  Added alias 'find-errors' to run command: 'grep -r "ERROR" /var/log/'
```

---

### Running an Alias

```bash
jarvis dev
```

If a path was provided while creating the alias, the command runs in that directory; otherwise, it runs in the current working directory.

**Regular Output:**
```
> Running command:
> npm run dev
> PID: 5678

> my-react-app@1.0.0 dev
> vite --host

  VITE v4.4.0  ready in 542 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
```

**Silent Mode (no output displayed):**
```bash
jarvis find-errors --silent
# or
jarvis find-errors -s
```

Silent mode is useful when you want to run commands in scripts or background processes without cluttering the terminal output.

---

### Listing Aliases

```bash
jarvis list
```

**Sample Output:**
```
┌─────────────┬─────────────────────────────────────────┬─────────────────────────────────────────┐
│ (index)     │ command                                 │ path                                    │
├─────────────┼─────────────────────────────────────────┼─────────────────────────────────────────┤
│ dev         │ 'npm run dev'                           │ '/Users/dev/my-react-app'               │
│ find-errors │ 'grep -r "ERROR" /var/log/'             │ undefined                               │
│ deploy      │ 'npm run build && npm run deploy'       │ '/Users/dev/my-app'                     │
│ logs        │ 'tail -f /var/log/app.log'              │ undefined                               │
└─────────────┴─────────────────────────────────────────┴─────────────────────────────────────────┘
```

---

### Removing an Alias

```bash
jarvis remove
```

You will be prompted to select which alias(es) to delete.

**Example Interaction (Single Alias):**
```
◇  Select aliases to delete
│  ◉ dev
│  ◯ find-errors  
│  ◯ deploy
│  ◯ logs
│
◇  Removed alias 'dev'
```

**Example Interaction (Multiple Aliases):**
```
◇  Select aliases to delete
│  ◯ dev
│  ◉ find-errors  
│  ◉ deploy
│  ◯ logs
│
◇  Removed alias 'find-errors, deploy'
```

### Version Check

```bash
jarvis --version
```

This command will display the current version of Jarvis installed on your system.

---

## Quick Reference

| Command | Description | Example |
|---------|-------------|---------|
| `jarvis alias` | Create a new alias | Interactive prompts guide you through setup |
| `jarvis <alias-name>` | Run an alias | `jarvis dev` |
| `jarvis <alias-name> --silent` | Run an alias silently | `jarvis deploy -s` |
| `jarvis list` | Show all aliases | Displays table with command and path |
| `jarvis remove` | Delete aliases | Interactive selection of aliases to remove |
| `jarvis --version` | Show version | Display current Jarvis version |
| `jarvis --help` | Show help | Display all available commands and options |

### Common Use Cases

- **Development Servers**: `npm run dev`, `yarn start`, `python manage.py runserver`
- **Build & Deploy**: `npm run build && npm run deploy`, `docker build -t myapp .`
- **Log Analysis**: `grep -r "ERROR" /var/log/`, `tail -f /var/log/app.log`
- **System Operations**: `docker-compose up -d`, `systemctl restart nginx`
- **Git Workflows**: `git add . && git commit -m "update" && git push`

---

## License

MIT

---

**Jarvis — Your personal command shortcut assistant!**
