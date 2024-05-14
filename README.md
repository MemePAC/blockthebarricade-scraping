# An open-source tool that scrapes social media profiles for a list of anti-Palestinian people.

Install packages necessary for scraping.

`npm install`

Scrapes people, specifically their names, from Reverse Canary Mission's [website](https://www.reversecanarymission.org) into a JSON file. Takes a couple minutes.

`node rcm.js`

Scrapes social media profiles from names using Google Knowledge Graph into a JSON file. Requires the JSON file from the previous command. Alternatively, create the person.json file yourself with an array of names you want to search. Create a new file called .env and copy the contents from the .temp.env file. Add your SerpApi key to your .env file (please note that free tier is limited to 100 searches). Takes a while (go take a walk and listen to [Hind's Hall](https://www.youtube.com/watch?v=fgDQyFeBBIo) on repeat).

`node search.js`
