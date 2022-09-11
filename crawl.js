const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto(
  //   "https://www.flashscore.com/football/england/premier-league/results/"
  // );
  // const idList = await page.evaluate(() => {
  //   let idMatchs = [];
  //   let items = document.querySelectorAll(".event__match");
  //   items.forEach((item) => {
  //     idMatchs.push(item.getAttribute("id"));
  //   });
  //   return idMatchs;
  // });
  // async () => {
  //   idList.forEach((element) => {
  //     scrapingResutByMatch(element.slice(4), page);
  //   });
  // };
  // page.close()
  const testList = [
    "g_1_04xUPC2l",
    "g_1_2TdgWEPK",
    "g_1_UFboYze8",
    "g_1_86ckXfAE",
    "g_1_GW0cVYvR",
    "g_1_8UyYOWHf",
    "g_1_nLzxOjX0",
    "g_1_UqQtNAn7",
    "g_1_rmUpMU1D",
    "g_1_MDwQQhmr",
    "g_1_xSMKHFAR",
    "g_1_E7GbAX21",
    "g_1_vy9nDZIr",
    "g_1_nwU7KHQ8",
    "g_1_YZP3LcB2",
    "g_1_hbF29iI7",
    "g_1_8hIGIeeL",
    "g_1_KpHfBDme",
    "g_1_MabiCgYl",
    "g_1_U1JCJytF",
    "g_1_0ULKbz4k",
    "g_1_Qk2WKQKi",
    "g_1_KWyMdEY1",
    "g_1_na3SL65o",
    "g_1_fP6zKpzb",
    "g_1_YF5vJ4k4",
    "g_1_GveqIO4A",
    "g_1_UsamHrKG",
    "g_1_MwNGaGlq",
    "g_1_ttwIcfJe",
    "g_1_xlzA3PkH",
    "g_1_GvZD2q5N",
    "g_1_tMt15oL4",
    "g_1_pfPqcNSp",
    "g_1_Ctkp9TLu",
    "g_1_jXml8myn",
    "g_1_Yewg77jh",
    "g_1_nasc6R5b",
    "g_1_KCu545zB",
    "g_1_A1YH13KT",
    "g_1_6R6OiSj5",
    "g_1_Sz8Kh8ya",
    "g_1_EiAWk6LH",
    "g_1_W8EBfU6n",
    "g_1_2gOu0jqP",
    "g_1_AaDFglMh",
    "g_1_0l6Sjn6B",
    "g_1_dGaykQzO",
    "g_1_z7bulpjU",
    "g_1_xnF7eAit",
    "g_1_veaB2OmQ",
    "g_1_CrKCsNB0",
    "g_1_040734YJ",
    "g_1_n1CPvLeJ",
    "g_1_4IG4qqsl",
    "g_1_r9F8r3df",
    "g_1_jZIGtsR6",
    "g_1_Yc8Lu1tD",
    "g_1_MgRapPRs",
    "g_1_QZqX1icF",
  ];
  testList.forEach((element) => {
    console.log(`Scraping to page with id ${element.slice(4)}`)
    scrapingResutByMatch(element.slice(4), browser);
  });
  console.log("finish!");
  // browser.close();
})();
//get result by match
const scrapingResutByMatch = async (link, browser) => {
  //   const browser = await puppeteer.launch();
  const newPage = await browser.newPage();
  try {
    await newPage.goto(
      `https://www.flashscore.com/match/${link}/#/match-summary/match-summary`,
      {
        timeout: 0,
      }
    );

    await newPage.evaluate(() => {
      let homeTeam = document.querySelector(
        ".participant__participantName"
      ).innerHTML;
      console.log("home team", homeTeam);
      newPage.close();
    });
  } catch (error) {
    console.log("whats is error: ", error);
  }
};
