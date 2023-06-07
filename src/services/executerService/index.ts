import util from 'node:util'
import { exec } from 'child_process'

const execute = util.promisify(exec)
import fs from 'fs/promises'

export const cppExecutor = async ({ code, input }) => {
  const copyCodePromise = Promise.all([
    fs.writeFile('code.cpp', code),
    fs.writeFile('input', input),
  ])

  try {
    const output = await copyCodePromise.then(async () => {
      const { stdout } = await execute('g++ code.cpp && ./a.out < input')
      return stdout
    })
    return {
      output: output,
      error: false,
    }
  } catch (err) {
    return { output: err.stderr, error: true }
  } finally {
    exec('rm -rf code.cpp input')
  }
}

export const javaExecutor = async ({ code, input }) => {
  const copyCodePromise = Promise.all([
    fs.writeFile('code.java', code),
    fs.writeFile('input', input),
  ])

  try {
    const output = await copyCodePromise.then(async () => {
      const { stdout } = await execute('java code.java < input')
      return stdout
    })
    return {
      output: output,
      error: false,
    }
  } catch (err) {
    return { output: err.stderr, error: true }
  } finally {
    exec('rm -rf code.java input')
  }
}

export const pyExecutor = async ({ code, input }) => {
  const copyCodePromise = Promise.all([
    fs.writeFile('code.py', code),
    fs.writeFile('input', input),
  ])

  try {
    const output = await copyCodePromise.then(async () => {
      const { stdout } = await execute('python3 code.py < input')
      return stdout
    })
    return {
      output: output,
      error: false,
    }
  } catch (err) {
    return { output: err.stderr, error: true }
  } finally {
    exec('rm -rf code.py input')
  }
}

export const nodeExecutor = async ({ code, input }) => {
  const copyCodePromise = Promise.all([
    fs.writeFile('code.js', code),
    fs.writeFile('input', input),
  ])

  try {
    const output = await copyCodePromise.then(async () => {
      const { stdout } = await execute('node code.js < input')
      return stdout
    })
    return {
      output: output,
      error: false,
    }
  } catch (err) {
    return { output: err.stderr, error: true }
  } finally {
    exec('rm -rf code.js input')
  }
}
