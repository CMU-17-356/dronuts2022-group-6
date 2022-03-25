import puppeteer, { Page } from "puppeteer";

const timeout = process.env.SLOWMO ? 30000 : 10000;

describe("Google.com", () => {
    it('should get correct title when go to home page', async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://google.com');
      const title = await page.title();
      expect(title).toEqual('Google');
    });
});