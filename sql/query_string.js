const queryGetConfigPE = (year_leagues, full_name) => {
  return `SELECT 
    s.source_name,
    j.id_source_name,
    j.source_location,
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
        c.source_location,
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
        bcn.name_branch = 'PEAR-${year_leagues}'  and ct.full_name='${full_name}') j ON s.id = j.id_source_name`;
};
exports.queryGetConfigPE = queryGetConfigPE;

const getBranchPEM = (name_branch) =>
  `select branch from branch_source_name where name_branch = "${name_branch}" `;
exports.getBranchPEM = getBranchPEM;
const insertLog = (id_config, file_name, date_log) => {
  return `insert into scraping_log (id_config, file_name, date_log) values(${id_config}, "${file_name}", "${date_log}")`;
};
exports.insertLog = insertLog
