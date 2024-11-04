// src/api/routes/fetchNews.js
const express = require('express');
const puppeteer = require("puppeteer");

const router = express.Router();

async function fetchNews() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://finance.yahoo.com/topic/stock-market-news", {
    waitUntil: "networkidle2"
  });
  await page.waitForSelector("li.js-stream-content.Pos\\(r\\)");

  const newsItems = await page.evaluate(() => {
    const items = [];
    const elements = document.querySelectorAll("li.js-stream-content.Pos\\(r\\)");

    elements.forEach((element, index) => {
      if (index >= 10) return;

      const categoryElement = element.querySelector("div[data-test-locator='catlabel']");
      const category = categoryElement ? categoryElement.innerText : "";

      if (category === "Business") {
        const headingElement = element.querySelector("h3 a");
        const heading = headingElement ? headingElement.innerText.trim() : "";

        const paragraphElement = element.querySelector("p");
        const paragraph = paragraphElement ? paragraphElement.innerText.trim() : "";

        const link = headingElement ? headingElement.href : "";

        items.push({ heading, paragraph, link });
      }
    });

    return items;
  });

  await browser.close();
  return newsItems;
}

// Define route to fetch news
router.get('/', async (req, res) => {
  try {
    const news = await fetchNews();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
