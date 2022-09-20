import { ElectronApplication, Page, _electron } from 'playwright'
import { test, expect } from '@playwright/test';

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

  await window.locator('button', { hasText: /^Increment$/ }).click()
  await expect(window.locator('text=Count:')).toHaveText('Count: 1');
})

test('Open Decrement window from starting window', async () => {
  const incrementPage = await app.firstWindow()

  await incrementPage.locator('text=Open Decrement Window').click()

  const decrementPage = await waitUntilWindowOpened()

  await expect(incrementPage.locator('button', { hasText: /Decrement Window$/ })).toHaveText('Close Decrement Window');

  await expect(decrementPage.locator('h1', { hasText: /^Decrement$/ })).toBeVisible()
})

test('Count state is moved across windows', async () => {
  const incrementPage = await app.firstWindow()
  await incrementPage.locator('text=Increment By 3').click()
  await incrementPage.locator('text=Open Decrement Window').click()
  const decrementPage = await waitUntilWindowOpened()

  await expect(incrementPage.locator('text=Count:')).toHaveText('Count: 3');
  await expect(decrementPage.locator('text=Count:')).toHaveText('Count: 3');

  await decrementPage.locator('button', { hasText: /^Decrement$/ }).click()

  await expect(incrementPage.locator('text=Count:')).toHaveText('Count: 2');
  await expect(decrementPage.locator('text=Count:')).toHaveText('Count: 2');
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