import "dotenv/config";
import fs from "fs/promises";

const { SERP_API_KEY } = process.env;

const source = "people.json";
const file = await fs.readFile(source, "utf-8");
const list = JSON.parse(file);

const rows = [];

// adjust list length based on your SerpApi limit
// concurrency might be good here LOLL
for (const item of list) {
  try {
    const params = {
      q: item,
      location: "United States",
      google_domain: "google.com",
      hl: "en",
      gl: "us",
      api_key: SERP_API_KEY,
    };

    const searchParams = new URLSearchParams(params).toString();
    const res = await fetch(`https://serpapi.com/search?${searchParams}`);
    const data = await res.json();

    const { knowledge_graph } = data;

    // SerpApi issue or public figure is more anti-Palestinian than they are famous
    if (!knowledge_graph) {
      continue;
    }

    const { title, profiles } = knowledge_graph;

    if (!profiles) {
      continue;
    }

    // flattening to rows for CSV or SQL
    for (const profile of profiles) {
      const { name, link } = profile;
      rows.push({ title, name, link });
    }
  } catch (e) {
    console.log(e);
  }
}

await fs.writeFile("rows.json", JSON.stringify(rows), "utf-8");
