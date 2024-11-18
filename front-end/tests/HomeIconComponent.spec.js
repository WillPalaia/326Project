import { test, expect } from '@playwright/test';

async function renderHomeIconComponent(page) {
  await page.evaluate(() => {
    // Import the HomeIconComponent class dynamically
    import('../components/HomeIconComponent/HomeIconComponent.js').then((module) => {
      const HomeIconComponent = module.HomeIconComponent;
      const homeIconComponent = new HomeIconComponent();
      const container = homeIconComponent.render();

      document.body.appendChild(container);
    });
  });
}

test.describe('HomeIconComponent Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5501/front-end/source/index.html');
  });

  test('should render the home icon button', async ({ page }) => {
    await renderHomeIconComponent(page);

    const homeButton = await page.locator('#home-button');
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toHaveText('🏠');
  });

  test('should navigate to the main page when the home icon button is clicked', async ({ page }) => {
    await renderHomeIconComponent(page);
    await page.evaluate(() => {
      window.location.href = 'about:blank';
    });

    const homeButton = await page.locator('#home-button');
    await homeButton.click();

    const url = await page.evaluate(() => window.location.href);
    await expect(url).toContain('index.html');
  });
});