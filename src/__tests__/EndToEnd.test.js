import puppeteer from "puppeteer";

describe("show/hide event details", () => {
    let browser;
    let context;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    });

    beforeEach(async () => {
        context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();
        await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
        await page.waitForSelector(".event");
    });

    afterEach(async () => {
        if (page) await page.close();
        if (context) await context.close();
    });

    afterAll(async () => {
        if (browser) await browser.close();
    });

    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeNull();
    });

    test("User can expand an event to see details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeDefined();
    });

    test("User can collapse an event to hide detaials", async () => {
        await page.click(".event .details-btn");
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeNull();
    });

    test("When user hasnt searched for a city, all events are shown", async () => {
        const events = await page.$$(".event");
        expect(events.length).toBeGreaterThan(0);
    });

    test("User can filter events by city", async () => {
        const cityInputSelector = ".city input";

        await page.waitForSelector(cityInputSelector);
        await page.click(cityInputSelector);
        await page.type(cityInputSelector, "Berlin");

        await page.waitForSelector(".event");

        const events = await page.$$(".event");

        for (const event of events) {
            const eventCity = await event.$eval(
                ".event-location",
                (node) => node.textContent
            );
            expect(eventCity).toContain("Berlin");
        }
    });
});