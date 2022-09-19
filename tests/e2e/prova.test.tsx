import { ElectronApplication, Page, _electron } from 'playwright'
import { test, expect } from '@playwright/test';

// const isPackaged = await app.evaluate(async ({ app }) => {
//   // This runs in Electron's main process, parameter here is always
//   // the result of the require('_electron') in the main app script.
//   return app.isPackaged
// })
// console.log(isPackaged) // false (because we're in development mode)

let app: ElectronApplication;
test.beforeEach(async () => {
  app = await _electron.launch({ args: ['.'] })
})

test.afterEach(async () => {
  await app.close()
})

test('Open App and increment', async () => {
  const window = await app.firstWindow()

  await expect(window.locator('text=Count:')).toHaveText('Count: 0');

  window.locator('button', { hasText: /^Increment$/ }).click()
  await expect(window.locator('text=Count:')).toHaveText('Count: 1');
})

test('asdasd', async () => {
  const window = await app.firstWindow()

  // app.once('window', async (win) => {
  //   win.locator('h1', { hasText: 'text=Decrement' })
  //   await expect(win.locator('text=Count:')).toHaveText('Count: 0');
  // })

  await window.waitForSelector('text=Open Decrement Window')

  window.locator('text=Open Decrement Window').click()

  await waitUntilWindowOpened()

  await expect(window.locator('button', { hasText: /Decrement Window$/ })).toHaveText('Close Decrement Window');
})


async function waitUntilWindowOpened(timeout: number = 2000): Promise<Page> {
  return new Promise((resolve, reject) => {
    let timeoutId = setTimeout(() => {
      reject("No new windows opened")
    }, timeout)

    app.once('window', async (win) => {
      clearTimeout(timeoutId)
      resolve(win)
    })
  })
}