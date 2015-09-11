<?php
/**
 * Access from index.php:
 */
if(!defined("_access")) {
	die("Error: You don't have permission to access here...");
}

$routes = array(
	0 => array(
		"pattern"	  => "/^estimate/",
		"application" => "api",
		"controller"  => "api",
		"method"	  => "estimate",
		"params"	  => array()
	),
	1 => array(
		"pattern"	  => "/^cities/",
		"application" => "api",
		"controller"  => "api",
		"method"	  => "cities",
		"params"	  => array()
	)
);
