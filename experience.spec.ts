import { test, expect } from '@playwright/test'
test('all letters, navigation and hug work on desktop and mobile', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('http://127.0.0.1:5173')
    await expect(page).toHaveTitle('For you, Mom ♡')
    await expect(page.locator('#opening-letter')).toBeHidden()
    await page.getByRole('button', {name:'Open my letter to Mom'}).click()
    await expect(page.locator('#opening-letter')).toBeVisible()
    await page.locator('#opening-letter a').click()
    for (const card of await page.locator('.note, .reminder').all()) {
      await card.click()
      await expect(page.locator('dialog')).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.locator('dialog')).not.toBeVisible()
      await expect(card).toBeFocused()
    }
    await page.getByRole('button', { name: 'One last hug? ♡' }).click()
    await expect(page.getByRole('status')).toContainText("biggest hug in the world")
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    expect(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBeTruthy()
    await page.evaluate(() => scrollTo(0, 0))
    await page.screenshot({path:`../../outputs/preview-${width}.png`, fullPage:true})
  }
  expect(errors).toEqual([])
})
test('reduced motion reveals content without animation', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('http://127.0.0.1:5173')
  await expect(page.locator('.finale h2')).toHaveCSS('opacity','1')
  await expect(page.locator('.floating-heart').first()).toHaveCSS('animation-name','none')
})
