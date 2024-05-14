// lowkey need error handling
import puppeteer from "puppeteer";
import fs from "fs/promises";

const browser = await puppeteer.launch({
  // if you want to see the magic
  headless: true,
});
const page = await browser.newPage();

const peopleSelector = "p.mui-16nhkcs";
const nextSelector =
  'button:not([disabled]) > svg[data-testid="ChevronRightIcon"]';

// shoutout
await page.goto("https://www.reversecanarymission.org/search", {
  waitUntil: "networkidle0",
});

const people = [];
while (true) {
  const nextButton = await page.$(nextSelector);
  if (!nextButton) {
    break;
  }

  const newPeople = await page.evaluate((selector) => {
    const elements = Array.from(document.querySelectorAll(selector));
    return elements.map((element) => element.textContent);
  }, peopleSelector);

  people.push(...newPeople);
  console.log("scraped:", people.length);

  // try not to get blocked challenge (ironic)
  await nextButton.click({ delay: 500 });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

await browser.close();

// i saw some duplicates
const unique = [...new Set(people)];
await fs.writeFile("people.json", JSON.stringify(unique), "utf-8");
