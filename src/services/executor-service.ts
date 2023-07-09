import util from 'node:util'
import { exec } from 'child_process'
import fs from 'fs/promises'
const execute = util.promisify(exec)

import { executionCmd, extension } from '../utils/constant.js'
import { ExecutInputType, ExecutOutputType } from '../utils/typings.js'

export const executor = async ({
  code,
  input,
  lang,
}: ExecutInputType): Promise<ExecutOutputType> => {
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
    return { output: err?.stderr, error: true }
  } finally {
    exec(`rm -rf code.${extension[lang]} input a.out`)
  }
}
