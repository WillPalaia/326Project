import { test, expect } from '@playwright/test';

// A helper function to render the HomeIconComponent in the DOM
async function renderHomeIconComponent(page) {
  // Simulate loading the HomeIconComponent on the page
  await page.evaluate(() => {
    // Import the HomeIconComponent class dynamically
    import('../components/HomeIconComponent/HomeIconComponent.js').then((module) => {
      const HomeIconComponent = module.HomeIconComponent;
      const homeIconComponent = new HomeIconComponent();
      const container = homeIconComponent.render();

      // Append the rendered container to the document body
      document.body.appendChild(container);
    });
  });
}

test.describe('HomeIconComponent Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5501/front-end/source/index.html');
  });

  test('should render the home icon button', async ({ page }) => {
    // Render the component
    await renderHomeIconComponent(page);

    // Check if the home icon button is rendered correctly
    const homeButton = await page.locator('#home-button');
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toHaveText('🏠');
  });

  test('should navigate to the main page when the home icon button is clicked', async ({ page }) => {
    // Render the component
    await renderHomeIconComponent(page);

    // Mock the window.location.href to prevent actual navigation
    await page.evaluate(() => {
      window.location.href = 'about:blank';
    });

    // Click the home icon button
    const homeButton = await page.locator('#home-button');
    await homeButton.click();

    // Check if the window.location.href is set to 'index.html'
    const url = await page.evaluate(() => window.location.href);
    await expect(url).toContain('index.html');
  });
});