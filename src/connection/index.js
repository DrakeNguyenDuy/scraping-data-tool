const mysql = require("mysql2");
// let connection = null;
// const instance = () => {
//   if (connection === null) {
//     connection = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       database: "dw_result_football",
//       password: "1234",
//     });
//     return connection;
//   } else {
//     return connection;
//   }
// };
let pool = null;
const instance = async () => {
  if (instance === null) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      database: "dw_result_football",
      password: "1234",
    });
  }
  return pool;
};
exports.instance = instance;
