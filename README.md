# Advent of code Deno Template

![](https://img.shields.io/badge/day%20📅-5-blue)
![](https://img.shields.io/badge/stars%20⭐-8-yellow)
![](https://img.shields.io/badge/days%20completed-4-red)

Template repository of solutions for the [Advent of Code][4] done by [ismtabo][1].
Create a new repository based on this template to use Deno in your Advent of Code solutions.

## Usage

### Prerequisites

You may need to [install deno][3] to use this repository.

Additional dependencies:
- Deno Create React App: https://deno.land/x/create_react_app@v0.1.2

### CLI tool

After installing it you can run the solutions using the cli tool:

```
$ deno run -A --unstable src/cli/mod.ts -h

  Usage:   aoc  
  Version: 0.1.1

  Description:

    Solutions for Advent of Code. https://adventofcode.com/

  Options:

    -h, --help     - Show this help.                            
    -V, --version  - Show the version number for this program.  

  Commands:

    run       - Run day solution                       
    run-all   - Run multiple day solution              
    new       - Create new day solution folder skeleton
    download  - Download input text file for given day 



```

### Run a day solution

The solutions can be run with the `run` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run -h

  Usage:   aoc run
  Version: 0.1.1  

  Description:

    Run day solution

  Options:

    -h, --help                 - Show this help.                                                                 
    -d, --day        <day>     - Day to run                                                   (required)         
    -p, --part       <part>    - Part of the day solution to run.                             (required)         
    -a, --all-parts            - Execute both parts. If present part option will be ignore.   (Conflicts: --part)
    -t, --time                 - Show spent time                                                                 
    -f, --file       <file>    - Input file. If missing, the day input file is used instead.                     
    --sample                   - Run day using sample input instead of day input file.        (Conflicts: --file)
    --format         <format>  - Output format. (Available formats: plain, json, csv)         (Default: "plain") 

```

Also, to run all the solutions you can use `run-all` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run-all -h

  Usage:   aoc run-all
  Version: 0.1.1      

  Description:

    Run multiple day solution

  Options:

    -h, --help                 - Show this help.                                                                  
    -p, --part       <part>    - Part of the day solution to run.                              (Default: 1)       
    -a, --all-parts            - Execute both parts. If present 'part' option will be ignore.  (Conflicts: --part)
    -t, --time                 - Show spent time                                                                  
    --sample                   - Run day using sample input instead of day input file.                            
    --format         <format>  - Output format. (Available formats: plain, json, csv)          (Default: "plain") 

```

### Test day solutions

Some of the day solutions have unit tests. To run them use [deno built-in test runner][5]:

```
$ deno test [OPTIONS] [file]

```

Some of the test need `--allow-read` to read the sample inputs of its day.

### Create day solution skeleton

New day solutions can be created using the `new` subcommand.

```
$ deno run -A --unstable src/cli/mod.ts new -h

  Usage:   aoc new
  Version: 0.1.1

  Description:

    Create new day solution folder skeleton

  Options:

    -h, --help         - Show this help.
    -d, --day   <day>  - Day of the solution. If omit the corresponding next day will be created.
```

This command will create a new folder inside the solutions path
with the following directory structure (see more structure information in [Day Solution structure](#day-solution-structure)):

```
/ dayX
├-/ {partOne,partTwo}: Modules of parts one and two
| ├- mod.ts: Main module of the part solution
| ...
├- mod.ts: Main module of the day solution
```

Once created, you are ready to go to code the new day solution. You may want to download your input file, to do so check the [download command](#download-day-input).

### Download day input

Each day input text file can be download to its day solution folder by the `download` command:

```
$ deno run -A --unstable src/cli/mod.ts new -h

  Usage:   aoc download
  Version: 0.1.1       

  Description:

    Download input text file for given day

  Options:

    -h, --help          - Show this help.                                                                     
    -d, --day    <day>  - Day of the solution. If omit the corresponding next day will be created.  (required)
    -f, --force         - Force input text file download if already exists one                                

```

If the file already exists it will throw an error unless you use the `--force` option to replace it.

#### Configuration

This command will required to set the required environment variables. You can use either a .env file or setting in your shell session.

| Variable      | Description                                  |  type  |
| :------------ | :------------------------------------------- | :----: |
| `AOC_SESSION` | Advent of code session cookie (**required**) | string |

**Disclaimer:** The `AOC_SESSION` is needed to allow Advent of Code website to identify your user and the cli will only use it with that purpose

### Bundle AOC solutions

Using [deno built-in bundler][8], you can bundle the problems module into a js module:

```
$ deno bundle [OPTIONS] <source_file> [out_file]

```

To bundle the solutions module the `<source_file>` need to be `src/problems/mod.ts`.

## Repository content

The source code of the repository is inside the `src` path:

### Folder
```
/ src
├- app: TBD
├-/ cli: Module of the cli tool to run problems and more
└-/ solutions: Module of solutions
```

### Cli tool structure

```
/ cli
├- template: Templates for day solution generation
├- mod.ts: Main module of the cli tool
├- type.d.ts: Types used in the cli tool
└- [...]: other stuff
```
### Day solution structure

Each day solution has the following structure:

```
/ dayX
├-/ {partOne,partTwo}: Modules of parts one and two
| ├- mod.ts: Main module of the part solution
| ├- [test.ts]: Test of the part solution
| ├- [type.d.ts]: Types of the part solution
| └- [...]: other stuff
| ...
├- mod.ts: Main module of the day solution
├- sample.txt: Sample input case
├- input.txt: Day input case
├- [type.d.ts]: Types used in both parts
└- [...]: other stuff
```

The main module exports two functions `main` and `preprocess` to run the solution parts and preprocess the input respectively. Each part module exports a function `partXxx` with its name in addition to other possible issues.

## Built with

- [Typescript][6] - Language used
- [Deno][2] - Runtime for Javascript and Typescript
- [Cliffy][7] - Command line framework for Deno

## Authors

- Ismael Taboada - Frontend developer - [@ismtabo][1]

## License

This repository is under MIT License - look up [LICENSE](./LICENSE) for more details

[1]: https://github.com/
[2]: https://deno.land/
[3]: https://deno.land/#installation
[4]: https://adventofcode.com
[5]: https://deno.land/manual/testing
[6]: https://www.typescriptlang.org/
[7]: https://cliffy.io/
[8]: https://deno.land/manual@v1.6.0/tools/bundler
