/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  const googleData = await fetch(`https://google.ca/search?q=${query}`);
  const bingData = await fetch(`https://www.bing.com/search?q=${query}`);

  const google = await googleData.text();
  const bing = await bingData.text();

  const scrape = _get_(google + bing, query);
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
function _get_(html: string, query: string) {
  const $ = load(html);
  const a = new Set<{ title: string; href: string }>();

  $("a[href]").map((i, el) => {
    if ($(el).attr("href")?.startsWith("/url?q=")) {
      const href = $(el).attr("href")!.substring(7);
      let title = $(el).text();

      //Trim the title
      if (avoids.includes(title.toLowerCase())) return;
      title.indexOf("www") !== -1 &&
        (title = title.substring(0, title.indexOf("www")));

      //Get indexes of & and %
      const iA = href.indexOf("&");
      const iP = href.indexOf("%");

      //Some duplicate conditional logic here
      //
      //No ampersand or percentage
      if (iA < 0 && iP < 0) a.add({ title, href });
      ///Percent exists
      if (iA < 0 && iP > 0) a.add({ title, href: href.substring(0, iP) });
      //Ampersand exists
      if (iA > 0 && iP < 0) a.add({ title, href: href.substring(0, iA) });
      //Both exist
      //Which comes first
      if (iA > 0 && iP > 0) {
        iA > iP
          ? a.add({ title, href: href.substring(0, iP) })
          : a.add({ title, href: href.substring(0, iA) });
      }
    }
  });

  return {
    title: query,
    a: a,
  };
}

//
const avoids: Array<string> = ["learn more", "sign in"];
