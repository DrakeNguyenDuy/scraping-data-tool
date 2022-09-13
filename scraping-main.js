const puppeteer = require("puppeteer");
const sbm = require("./scraping-by-match");
const scrapingMain = async (listLink, index) => {
  const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)")
  await page.goto(`https://www.flashscore.com${listLink[index]}results/`, {
    waitUntil: "networkidle0", // using for single application
  });
  //wait for link show more ready
  // await page.waitForSelector("a.event__more.event__more--static", {
  //   visible: true,
  // });
  //get element link show more
  const [el] = await page.$x('//*[@id="live-table"]/div[1]/div/div/a');
  if (el !== undefined) {
    while ((await el.getProperties("textContent")).values() !== null) {
      try {
        await page.click("a.event__more.event__more--static");
      } catch (error) {
        break;
      }
    }
  }
  //loops to can not get element link anymore
  //when can not get link element load more then break loops and out loops
  //get id list of match all year
  const idList = await page.evaluate(() => {
    let idMatchs = [];
    let items = document.querySelectorAll(".event__match");
    items.forEach((item) => {
      idMatchs.push(item.getAttribute("id"));
    });
    console.log(idMatchs);
    return idMatchs;
  });
  //close page show all match in year
  page.close();
  /*
    method below to scraping data resul of the match
    with index start is 0
  */
  const order = 0;
  sbm.scrapingResutByMatch(idList, browser, order, listLink, index);
};
exports.scrapingMain = scrapingMain;
