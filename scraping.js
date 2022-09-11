const puppeteer = require("puppeteer");
const scraping = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);
  const [el] = await page.$x(
    '//*[@id="__next"]/div[1]/main/div[3]/div[1]/div[1]/div[1]/div[1]/div/div/div/picture/img'
  );
  const id = await el.getProperties("src");
  const idDiv = await id.values();
//   while(idDiv.){

//   }
console.log(idDiv.return.toString);
  browser.close();
};
scraping(
  "https://tiki.vn/apple-iphone-13-hang-chinh-hang-p184059211.html?spid=123547428"
);
