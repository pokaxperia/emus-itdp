<?php
/**
 * Access from index.php:
 */
if(!defined("_access")) {
	die("Error: You don't have permission to access here...");
}

class Api_Controller extends ZP_Controller {
	
	public function __construct() {
		$this->app("api");
		
		$this->Templates = $this->core("Templates");
		$this->Api_Model = $this->model("Api_Model");
		
		$this->Templates->theme();
	}
	
	public function index() {
		$vars["view"] = $this->view("home", TRUE);
		
		$this->render("content", $vars);
	}
	
	//example
	public function example() {
		$vars["results"] = null;
		
		echo json_encode($vars, JSON_NUMERIC_CHECK);
	}
}
