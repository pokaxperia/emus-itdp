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
	),
	2 => array(
		"pattern"	  => "/^modalidades/",
		"application" => "api",
		"controller"  => "api",
		"method"	  => "modalidades",
		"params"	  => array(segment(1))
	),
	3 => array(
		"pattern"	  => "/^proyectos/",
		"application" => "api",
		"controller"  => "api",
		"method"	  => "proyectos",
		"params"	  => array(segment(1))
	)
);
