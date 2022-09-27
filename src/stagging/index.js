const connection = require("../connection/index");
const instance = connection.connection;
const stringQuery = require("../../sql/query_string");
const { copyFile } = require("./copyFile");
const loadToStagging = () => {
  //delete all record in stagging
  instance.execute(stringQuery.deleteRecords, (err, results, fields) => {
    if (err) throw err;
    console.log("Refresh finish");
  });
  //get file to load to stagging
  instance.query(stringQuery.loadLogFile, (err, results, fields) => {
    if (err) throw err;
    test = results;
    results.forEach((item) => {
      console.log(`Coping file ${item.file_name} to folder load`);
      copyFile(item.file_name, instance);
    });
  });
};
loadToStagging();
exports.loadToStagging = loadToStagging;
