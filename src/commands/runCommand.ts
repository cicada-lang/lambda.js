import { type Command } from "@xieyuheng/commander.js"
import fs from "fs"
import Path from "path"
import { load, run } from "../lang/run/index.ts"

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
    const url = createURL(String(commander.args[0]))

    try {
      const mod = await load(url)
      run(mod)
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

    throw new Error(`I can not create URL from path: ${path}`)
  }
}
