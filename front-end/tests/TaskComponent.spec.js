import { test, expect } from '@playwright/test';

// A helper function to render the TaskComponent in the DOM
async function renderTaskComponent(page, taskData) {
  // Simulate loading the TaskComponent on the page
  await page.evaluate((data) => {
    // Import the TaskComponent class dynamically
    import('../components/TaskComponent/TaskComponent.js').then((module) => {
      const TaskComponent = module.TaskComponent;
      const taskComponent = new TaskComponent(data);
      const container = taskComponent.render();

      // Append the rendered container to the document body
      document.body.appendChild(container);
    });
  }, taskData);
}

test.describe('TaskComponent Tests', () => {
  
  test('should render the task component with task description', async ({ page }) => {
    const taskData = { task: 'Test Task Description' };
    
    // Render the component
    await renderTaskComponent(page, taskData);

    // Check if the task description is rendered correctly
    const taskText = await page.locator('.task-item span');
    await expect(taskText).toHaveText('Test Task Description');
  });

  test('should render the task component with default text when no task description is provided', async ({ page }) => {
    const taskData = {}; // No task description
    
    // Render the component
    await renderTaskComponent(page, taskData);

    // Check if the default text is displayed
    const taskText = await page.locator('.task-item span');
    await expect(taskText).toHaveText('No task description');
  });

  test('should render the file link if file data is provided', async ({ page }) => {
    // Mock a file object
    const mockFile = new File(['file content'], 'example.txt', { type: 'text/plain' });
    const taskData = { task: 'Task with file', file: mockFile };
    
    // Render the component
    await renderTaskComponent(page, taskData);

    // Check if the file link is rendered
    const fileLink = await page.locator('.task-item a');
    await expect(fileLink).toHaveText('example.txt');
    
    // Check if the link opens in a new tab
    const target = await fileLink.getAttribute('target');
    await expect(target).toBe('_blank');

    // Ensure the href is set to a blob URL
    const href = await fileLink.getAttribute('href');
    await expect(href).toContain('blob:');
  });

  test('should not render a file link if no file is provided', async ({ page }) => {
    const taskData = { task: 'Task without file' };
    
    // Render the component
    await renderTaskComponent(page, taskData);

    // Check that no file link is present
    const fileLink = await page.locator('.task-item a');
    await expect(fileLink).toHaveCount(0);
  });
});
