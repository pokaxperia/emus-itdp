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
	
	//estimate
	public function estimate() {
		$vars["results"] = null;
		
        $jsonStr = file_get_contents("php://input");
		$json = json_decode($jsonStr, TRUE);

		if(isset($json["AnchoCalle"])) {
			$vars["results"] = $this->Api_Model->getResults($json);
		}
		
		echo json_encode($vars, JSON_NUMERIC_CHECK);
	}
	
	public function cities() {
		$vars["results"]  = $this->Api_Model->getCities();
		echo json_encode($vars, JSON_NUMERIC_CHECK);
	}
	
	public function modalidades() {
		$vars["results"]  = $this->Api_Model->modalidades();
		echo json_encode($vars, JSON_NUMERIC_CHECK);
	}
	
	public function proyectos($id_modalidad = 0) {
		$vars["results"]  = $this->Api_Model->proyectos($id_modalidad);
		echo json_encode($vars, JSON_NUMERIC_CHECK);
	}
}
