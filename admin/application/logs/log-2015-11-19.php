<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed'); ?>

ERROR - 2015-11-19 13:55:02 --> Severity: Warning  --> pg_query(): Query failed: ERROR:  invalid input syntax for type double precision: "-76.99424743652344,"
LINE 3: ..."latitude" = '-12.050316841254796', "longitude" = '-76.99424...
                                                             ^ /var/www/agustino-admin/system/database/drivers/postgre/postgre_driver.php 176
ERROR - 2015-11-19 13:55:02 --> Query error: ERROR:  invalid input syntax for type double precision: "-76.99424743652344,"
LINE 3: ..."latitude" = '-12.050316841254796', "longitude" = '-76.99424...
                                                             ^
ERROR - 2015-11-19 17:07:41 --> Severity: Warning  --> pg_query(): Query failed: ERROR:  column "fecha" is of type timestamp without time zone but expression is of type integer
LINE 1: ...VALUES ('1', '-12.050316841254796', '-77.00480461120605', 0)
                                                                     ^
HINT:  You will need to rewrite or cast the expression. /var/www/agustino-admin/system/database/drivers/postgre/postgre_driver.php 176
ERROR - 2015-11-19 17:07:41 --> Query error: ERROR:  column "fecha" is of type timestamp without time zone but expression is of type integer
LINE 1: ...VALUES ('1', '-12.050316841254796', '-77.00480461120605', 0)
                                                                     ^
HINT:  You will need to rewrite or cast the expression.
