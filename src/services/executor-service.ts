import util from 'node:util'
import { exec } from 'child_process'

const execute = util.promisify(exec)
import fs from 'fs/promises'
import { executionCmd, extension } from '@utils/constant.ts'

export const executor = async ({ code, input, lang }) => {
  const copyCodePromise = Promise.all([
    fs.writeFile(`code.${extension[lang]}`, code),
    fs.writeFile('input', input),
  ])

  try {
    const output = await copyCodePromise.then(async () => {
      const { stdout } = await execute(executionCmd[lang])
      return stdout
    })

    return {
      output: output,
      error: false,
    }
  } catch (err) {
    return { output: err.stderr, error: true }
  } finally {
    exec(`rm -rf code.${extension[lang]} input a.out`)
  }
}
