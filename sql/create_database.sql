create database dw_result_football;
use dw_result_football;
/*craete table configration acccess to source data and address ftp server*/
CREATE TABLE configration (
    id INTEGER auto_increment primary key,
    id_source_name integer not null,
    source_location VARCHAR(50) not null,
    ftp VARCHAR(50) not null,
    id_contact INTEGER not null
);

/*create table sraping log to log process scarping data from source data*/
CREATE TABLE scraping_log (
    id INTEGER auto_increment primary key,
    id_config INTEGER not null,
    file_name VARCHAR(100) not null,
    date_log DATE not null,
    status INTEGER default 0
);

/*create table contactor: contactor who is responsible*/
CREATE TABLE contactor (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50),
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

/*create table source name: contain all name want to scraping data*/
create table source_name(id integer auto_increment primary key, source_name varchar(50));

/*create table branch source name: contains all branch of web source data*/
create table branch_source_name (
id integer auto_increment primary key,
id_source_name integer not null,
name_branch varchar(50) default "",
branch varchar(100) default ""
);

/*create table result football */
CREATE TABLE resut_football (
    id_match varchar(20) primary key,
    name_league VARCHAR(50) NOT NULL,
    home_team VARCHAR(50) NOT NULL,
    away_team VARCHAR(50) NOT NULL,
    time_start TIMESTAMP,
    match_day DATETIME,
    goal_home_team INT NOT NULL,
    goal_away_team INT NOT NULL,
    referee VARCHAR(50) DEFAULT 'Không có dữ liệu',
    venue VARCHAR(50) DEFAULT 'Không có dữ liệu',
    attendance INT DEFAULT NULL,
    round VARCHAR(25) NOT NULL,
    status VARCHAR(25) DEFAULT NULL
);
alter table configration add foreign key (id_contact) references contactor (id);
alter table configration add foreign key (id_source_name) references source_name (id);
alter table scraping_log add foreign key(id_config) references configration(id);
alter table branch_source_name add foreign key (id_source_name) references source_name(id); 
/*
insert data to table
*/
insert into contactor (full_name,user_name, password) values ("Nguyễn Dũy Long", "long-ftp", "1234");
insert into source_name(source_name) value ("www.flashscore.com");
insert into scraping_log(id_config, file_name, date_log) values (1, "test.csv", "2022-1-2") ;
insert into branch_source_name (id_source_name, name_branch, branch ) values (1, "PEAR-2022-2023", "/football/england/premier-league-2022-2023/results/");
insert into branch_source_name (id_source_name, name_branch, branch ) values (1, "PEM-2022-2023", "/match/");
insert into configration (id_source_name, source_location, ftp, id_contact) values (1, 'D:/js/scraping/ver-01/results', 'ftpupload.net',1 );