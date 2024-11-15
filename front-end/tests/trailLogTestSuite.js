import { test, expect } from "@playwright/test";

// Mock trail data
const mockTrail1 = {
    trailName: "Forest Loop",
    distance: 5.2
};


test.describe("TrailLogService Test Suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5501/front-end/source/index.html");
    });

    test("Should open the database successfully", async ({ page }) => {
        const db = await page.evaluate(async () => {
            const trailService = new window.TrailLogService();
            return await trailService.initDB();
        });
        expect(db).toBeDefined();
    });

    test("Should add a trail to the database successfully", async ({ page }) => {
        const result = await page.evaluate(async () => {
            const trailService = new window.TrailLogService();
            return await trailService.storeTrail({
                trailName: "Forest Loop",
                distance: 5.2
            });
        });
        expect(result).toBe("Trail stored successfully");
    });

    test("Should retrieve all trails after adding a trail", async ({ page }) => {
        
        await page.evaluate(async () => {
            const trailService = new window.TrailLogService();
            await trailService.storeTrail({
                trailName: "Forest Loop",
                distance: 5.2
            });
        });

        const trails = await page.evaluate(async () => {
            const trailService = new window.TrailLogService();
            return await trailService.loadTrailsFromDB();
        });

        expect(trails[0]).toMatchObject(mockTrail1);
    });
});