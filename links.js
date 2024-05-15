import "dotenv/config";
import fs from "fs/promises";

const source = "rows.json";
const file = await fs.readFile(source, "utf-8");
const list = JSON.parse(file);

const titles = list.map((item) => item.title);
const unique = [...new Set(titles)];
