const fs = require("fs");
const slby = require("./scraping-league-by-years");
const sm = require("./scraping-main");
//name colums in file csv
const header =
  "HomeTeam,AwayTeam,TimeStart,ScoreForWinner,ScoreForLoser,Referee,Venue,Attendance,Round,Status\r\n";
//write name columns to file
fs.writeFile("result-football.csv", header, "utf8", () => {});
//method below will scraping link of league all years (from 1990 to now)
slby.scrapingLeagueByYears().then((listLink) => {
  //start index with 0
  const startIndex = 0;
  sm.scrapingMain(listLink, startIndex);
});
