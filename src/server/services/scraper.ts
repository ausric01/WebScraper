import { load } from "cheerio";
import { z } from "zod";

/**
 * Returns the scraped elements from the searched query
 * @returns {{
 *  title: string,
 *  a: Array<string>
 * }} HTML Contents
 */
export async function scrape(query: string) {
  const data = await fetch(`https://google.ca/search?q=${query}`);
  const html = await data.text();
  const scrape = await _get_(html);
  return scrape;
}

/**
 *The scraped elements from the searched query
 * @param html
 * @returns {{
 *  title: string,
 *  a: Array<string>
 * }} HTML contents
 */
async function _get_(html: string) {
  const $ = load(html);
  //
  const title = $("title").text();
  let a = Array<string>();
  $("a[href]").map((i, el) => {
    if ($(el).attr("href")!.startsWith("/url?q=")) {
      const url = $(el).attr("href")!.substring(7);

      //Check the index of both characters
      const aI = url.indexOf("&");
      const pI = url.indexOf("%");

      //Condition checking
      if (aI < 0 && pI < 0) a.push(url);
      if (aI < 0 && pI > 0) a.push(url.substring(0, pI));
      if (aI > 0 && pI < 0) a.push(url.substring(0, aI));
      if (aI > 0 && pI > 0) {
        aI > pI ? a.push(url.substring(0, pI)) : a.push(url.substring(0, aI));
      }
    }
  });

  return {
    title: title,
    a: a,
  };
}

const avoids: Array<string> = [];
