const puppeteer = require("puppeteer");
const fs = require("fs");
const header =
  "HomeTeam,AwayTeam,TimeStart,ScoreForWinner,ScoreForLoser,Referee,Venue,Attendance,Round,Status\r\n";
fs.writeFile("result-football.csv", header, "utf8", () => {});
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.flashscore.com/football/england/premier-league/results/"
  );
  const idList = await page.evaluate(() => {
    let idMatchs = [];
    let items = document.querySelectorAll(".event__match");
    items.forEach((item) => {
      idMatchs.push(item.getAttribute("id"));
    });
    return idMatchs;
  });
  page.close();
  const order = 0;
  scrapingResutByMatch(idList, browser, order);
})();
//get result by match
const scrapingResutByMatch = async (listID, browser, order) => {
  let newPage = await browser.newPage();
  const id = listID[order].slice(4);
  console.log(`Scraping to page with id ${id}`);
  try {
    await newPage.goto(
      `https://www.flashscore.com/match/${id}/#/match-summary/match-summary`,
      {
        waitUntil: "networkidle0",
      }
    );
    const result = await newPage.evaluate(
      (order, listID) => {
        let row = "";
        let homeTeam = "";
        try {
          homeTeam = document.querySelector(
            ".duelParticipant__home .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get home_team");
        }
        row += `${homeTeam},`;
        let awayTeam = "";
        try {
          awayTeam = document.querySelector(
            ".duelParticipant__away .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get away_team");
        }
        row += `${awayTeam},`;
        let timeStart = "";
        try {
          timeStart = document.querySelector(
            ".duelParticipant__startTime div"
          ).textContent;
        } catch (error) {
          console.log("error while get time start");
        }
        row += `${timeStart},`;
        let scoreForWinner = "";
        try {
          scoreForWinner = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).firstChild.textContent;
        } catch (error) {
          console.log("error while get score for winner");
        }
        row += `${scoreForWinner},`;
        let scoreFosLoser = "";
        try {
          scoreFosLoser = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).lastChild.textContent;
        } catch (error) {
          console.log("error while get score for loser");
        }
        row += `${scoreFosLoser},`;
        const mathInfo = document.getElementsByClassName("mi__item__val");
        let referee = "";
        try {
          referee = mathInfo[0].textContent;
        } catch (error) {
          console.log("error while get referee");
        }
        row += `${referee},`;
        let venue = "";
        try {
          venue = mathInfo[1].textContent;
        } catch (error) {
          console.log("error while get venue");
        }
        row += `${venue},`;
        let attendance = "";
        try {
          attendance = mathInfo[2].textContent;
        } catch (error) {
          console.log("error while get attendance");
        }
        row += `${attendance},`;
        let round = "";
        try {
          round = document.querySelector(
            ".tournamentHeader__country a"
          ).textContent;
        } catch (error) {
          console.log("error while get round");
        }
        row += `${round},`;
        let status = "";
        try {
          status = document.querySelector(
            ".fixedHeaderDuel__detailStatus"
          ).textContent;
        } catch (error) {
          console.log("error while get status");
        }
        row += `${status}\r\n`;
        if (order + 1 !== listID.length) {
          return {
            isContinue: true,
            data: row,
          };
        } else {
          return {
            isContinue: false,
            data: row,
          };
        }
      },
      order,
      listID
    );
    fs.appendFileSync("result-football.csv", result.data);
    if (result.isContinue) {
      newPage.close();
      scrapingResutByMatch(listID, browser, order + 1);
    } else {
      console.log("finish!");
    }
  } catch (error) {
    console.log("what's is error: ", error);
    browser.close();
  }
};
