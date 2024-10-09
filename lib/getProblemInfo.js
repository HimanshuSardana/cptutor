import * as cheerio from "cheerio";

export const getProblemInfo = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  const $ = await cheerio.load(data);
  return $(".problem-statement").text();
};

console.log(
  await getProblemInfo("https://codeforces.com/problemset/problem/4/A"),
);
