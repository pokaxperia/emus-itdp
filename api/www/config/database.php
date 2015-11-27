<?php
/* ex: set tabstop=2 noexpandtab: */
/**
 * Access from index.php:
 */
if(!defined("_access")) {
        die("Error: You don't have permission to access here...");
}

/**
 *	SQL Databases
 */
$ZP["db"]["dbPDO"]    = TRUE;
$ZP["db"]["dbDriver"] = "pgsql";
$ZP["db"]["dbHost"]   = "127.0.0.1";
$ZP["db"]["dbUser"]   = "transeun_carlos_colima";
$ZP["db"]["dbPwd"]    = "yi7Vqt3RIOpQrtA6j1";
$ZP["db"]["dbName"]   = "transeun_emus_itp";
$ZP["db"]["dbPort"]   = 5432;
$ZP["db"]["dbPfx"]    = "";
$ZP["db"]["dbSocket"] = NULL;

/**
 *	SQLite Databases
 */
$ZP["db"]["dbFilename"] = "mydatabase.db";
$ZP["db"]["dbMode"]         = 0666;

/**
 *	NoSQL Databases
 */
$ZP["db"]["dbNoSQLHost"]         = "localhost";
$ZP["db"]["dbNoSQLPort"]         = 27017;
$ZP["db"]["dbNoSQLUser"]         = "";
$ZP["db"]["dbNoSQLPwd"]          = "";
$ZP["db"]["dbNoSQLDatabase"] = "";
