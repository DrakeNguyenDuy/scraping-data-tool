const fs = require("fs");
const mysql = require("mysql2");
(async () => {
  const full_name = "Nguyễn Dũy Long";
  const sql = `SELECT cf.source_name, cf.source_location, cf.ftp, c.full_name,c.user_name,c.password FROM configration cf LEFT JOIN contactor c ON cf.id_contact = c.id WHERE c.full_name = "${full_name}"`;
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "dw_result_football",
    password: "1234",
  });
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const next_year = year + 1;
  /*
  year of the league 
  Ex: 2022-2023
  */
  const year_leagues = `${year}-${next_year}`;
  const stringQuery = `SELECT 
  s.source_name,
  j.id_source_name,
  j.branch,
  j.ftp,
  j.id_contact,
  j.user_name,
  j.password
FROM
  source_name s
      LEFT JOIN
  (SELECT DISTINCT
      c.id_source_name,
          bcn.branch,
          c.ftp,
          c.id_contact,
          ct.user_name,
          ct.password
  FROM
      contactor ct
  LEFT JOIN configration c ON ct.id = c.id_contact
  LEFT JOIN branch_source_name bcn ON c.id_source_name = bcn.id_source_name
  WHERE
      bcn.name_branch = 'PE-${year_leagues}'  and ct.full_name='${full_name}') j ON s.id = j.id_source_name`;
  const promisePool = pool.promise();
  const [rows, fiels] = await promisePool.query(stringQuery);
  console.log(rows);
  const name_file = `${
    rows[0].source_name
  }_result_football.${year}-${month}-${day}_scraping-${rows[0].ftp.substring(
    6,
    rows[0].ftp.length
  )}.csv`;
  const header = `LeagueName,HomeTeam,AwayTeam,TimeStart,Date,Gwinner,GLoser,Referee,Venue,Attendance,Round,Status\r\n`;
  //create a new file and add header in to file csv
  fs.writeFile(`D:/js/scraping/ver-01/results/${name_file}`, header, (err) => {
    console.log("saved");
  });
})();
