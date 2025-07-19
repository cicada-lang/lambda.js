import { type Command } from "@xieyuheng/commander.js"
import fs from "fs"
import Path from "path"
import { load } from "../lang/load/index.ts"

export const runCommand: Command = {
  name: "run",
  description: "Run a file",
  help(commander) {
    return [
      `The ${this.name} command run a file.`,
      ``,
      `  ${commander.name} ${this.name} <file>`,
      ``,
    ].join("\n")
  },

  async run(commander) {
    try {
      if (typeof commander.args[0] !== "string") {
        throw new Error(
          `[run] I expect the first argument to be a path, instead of: ${commander.args[0]}`,
        )
      }

      const url = createURL(commander.args[0])
      await load(url)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        process.exit(1)
      }

      process.exit(1)
    }
  },
}

function createURL(path: string): URL {
  try {
    return new URL(path)
  } catch (_) {
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
      const fullPath = Path.resolve(path)
      return new URL(`file:${fullPath}`)
    }

    throw new Error(`[createURL] I can not create URL from path: ${path}`)
  }
}
