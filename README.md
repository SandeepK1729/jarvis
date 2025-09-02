# Jarvis

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

Install Jarvis globally from the GitHub Package Registry:

```bash
npm install -g @SandeepK1729/jarvis
```

> **Note:** To install from GitHub Packages, create a `.npmrc` file in your home or project directory:
> ```
> @SandeepK1729:registry=https://npm.pkg.github.com
> ```
> Then log in:
> ```bash
> npm login --registry=https://npm.pkg.github.com
> ```
> Use your GitHub username and a personal access token.

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

You will be prompted:
- **What is the command to alias?** (e.g. `echo "hello world"`)
- **What is the alias command?** (e.g. `hello`)
- **Is there any specific path for the command run?** (e.g. `/Users/SandeepK1729/Projects`)
  *(Optional - It will run in the current directory if not specified)*

**Example Interaction:**
```
◇  What is the command to alias?
│  echo "hello world"
│
◇  What is the alias command ?
│  hello
│
◇  Is there any specific path for the command run? (Optional - It will run in the current directory if not specified)
│  /Users/SandeepK1729/Projects
│
◇  Added alias 'hello' to run command: 'echo "hello world"'
```

---

### Running an Alias

```bash
jarvis hi
```

If a path was provided while creating the alias, the command runs in that directory; otherwise, it runs in the current working directory.

**Output:**
```
> Running command:
> echo "hello world"

"hello world"
```

---

### Listing Aliases

```bash
jarvis list
```

**Sample Output:**
```
┌───────────┬────────────────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ (index)   │ command                            │ path                                                                   │
├───────────┼────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ hello     │ 'echo "hello world"'               │ '/Users/SandeepK1729/Projects'                                         │
└───────────┴────────────────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

### Removing an Alias

```bash
jarvis remove
```

You will be prompted to select which alias(es) to delete.

**Example Interaction:**
```
◇  Select aliases to delete
│  hello
│
◇  Removed alias 'hello'
```

---

## License

MIT

---

**Jarvis — Your personal command shortcut assistant!**