<?php
/**
 * Access from index.php:
 */
if(!defined("_access")) {
	die("Error: You don't have permission to access here...");
}

class Api_Model extends ZP_Model {
	
	public function __construct() {
		$this->Db = $this->db();
		$this->cityId = 1;
		$this->helpers();
		$this->options = null;
		$this->dataCity = null;
		$this->Area_Infraestructura = 0;
	}
	
	public function getDataCity($cityId = false) {
		if($cityId == false) $cityId = $this->cityId;
		
		$query	 = "SELECT * from dataset";
		$query  .= " where id_city=".$cityId;
		$data	 = $this->Db->query($query);
		
		if(!$data and !is_array($data)) return false;
		
		return $data[0];
	}
	
	public function getResults($options) {
		$this->options = $options;
		$this->dataCity = $this->getDataCity();
		
		if($this->options["infraestructura"] == "CC") {
			$data["calculadora"] = $this->getCC();
		} elseif($this->options["infraestructura"] == "CCE") {
			$data["calculadora"] = $this->getCCE();
		} elseif($this->options["infraestructura"] == "BB") {
			$data["calculadora"] = $this->getBB();
		} elseif($this->options["infraestructura"] == "CICA") {	
			$data["calculadora"] = $this->getCICA();
		} else {
			return null;
		}
		
		$data["egresos"]["estatales"] = $this->getEgresos();
		$data["egresos"]["municipales"] = $this->getEgresos("municipales");
		$data["ingresos"]["estatales"] = $this->getIngresos();
		$data["ingresos"]["municipales"] = $this->getIngresos("municipales");
		$data["ingresos"]["porcentajes"] = $this->getIngresosPorcentajes();
		$data["ingresos"]["porcentajes1000"] = $this->getIngresosPorcentajes("1000");
		$data["egresos"]["porcentajes"] = $this->getEgresosPorcentajes();
		$data["egresos"]["porcentajes1000"] = $this->getEgresosPorcentajes("1000");
		
		$data["options"] = $this->options;
		return $data;
	}
	
	//Ejemplo: {"infraestructura":"CC","A":1,"B":20,"C":1,"D":3,"E":4,"F":8,"G":8,"H":0,"I":0,"J":2,"K":15,"L":"SI","M":"NO","N":"SI"}
	
	/*Ciclovía por elemento de confinamiento*/
	public function getCC() {
		$data = null;
		
		$data[1]["precio_unitario"] = 2.24;
		$data[1]["cantidad"] = 1000*$this->options["A"]*$this->options["B"];
		//$data[1]["importe"] = $data[1]["cantidad"]*$data[1]["precio_unitario"];
		
		$data[2]["precio_unitario"] = 336.65;
		$data[2]["cantidad"] = (1.3*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[3]["precio_unitario"] = 328.24;
		$data[3]["cantidad"] = (3.85*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);
		
		$data[4]["precio_unitario"] = 63.12;
		$data[4]["cantidad"] = (3.85*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);

		$data[5]["precio_unitario"] = 22.31;
		$data[5]["cantidad"] = 2*$data[4]["precio_unitario"];
		
		$data[6]["precio_unitario"] = 107.01;
		$data[6]["cantidad"] = (1.3*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[7]["precio_unitario"] = 10.16;
		$data[7]["cantidad"] = 20*$data[6]["precio_unitario"];
		
		$data[1]["precio_unitario"] = 99.93;
		$data[1]["cantidad"] = holaaaaaaaa;
		
		$data[1]["precio_unitario"] = 9.15;
		$data[1]["cantidad"] = holaaaaaaaa;
		
		$data[1]["precio_unitario"] = 53.3;
		$data[1]["cantidad"] = holaaaaaaaa;
		
		$data[1]["precio_unitario"] = holaaaaaaaaaa;
		$data[1]["cantidad"] = holaaaaaaaa;
		
		$data[1]["precio_unitario"] = holaaaaaaaaaa;
		$data[1]["cantidad"] = holaaaaaaaa;
		
		$data[1]["precio_unitario"] = holaaaaaaaaaa;
		$data[1]["cantidad"] = holaaaaaaaa;

		die(var_dump($data));
		
		return $data;
	}
	
	/*Ciclovía por cordón de estacionamiento*/
	public function getCCE() {
		
	}
	
	/*Carril compartido ciclista con transporte público (BusBici)*/
	public function getBB() {
		
	}
	
	/*Ciclocarril*/
	public function getCICA() {
		
	}
	
	/*obtener egresos*/
	public function getEgresos($type="estatal") {
		if($type=="estatal") {
			$query = "select * from egresos_estatales where cvegeo=".$this->options["estado"];
			$data  = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		} else {
			$query  = "select * from egresos_municipales where cveestado=".$this->options["estado"];
			$query .= " and cvemun=".$this->options["municipio"];
			$data   = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		}
	}
	
	/*obtener ingresos*/
	public function getIngresos($type="estatal") {
		if($type=="estatal") {
			$query = "select * from ingresos_estatales where cvegeo=".$this->options["estado"];
			$data  = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		} else {
			$query  = "select * from ingresos_municipales where cveestado=".$this->options["estado"];
			$query .= " and cvemun=".$this->options["municipio"];
			$data   = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		}
	}
	
	/*obtener ingresos*/
	public function getIngresosPorcentajes($type=false) {
		if($type=="1000") {
			$query = "select * from ingresos_porcentajes_1000 where cveestado=".$this->options["estado"];
			$data  = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		} else {
			$query  = "select * from ingresos_porcentajes where cveestado=".$this->options["estado"];
			$data   = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		}
	}
	
	/*obtener egresos*/
	public function getEgresosPorcentajes($type=false) {
		if($type=="1000") {
			$query = "select * from egresos_porcentajes_1000 where cveestado=".$this->options["estado"];
			$data  = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		} else {
			$query  = "select * from egresos_porcentajes where cveestado=".$this->options["estado"];
			$data   = $this->Db->query($query);
		
			if(!$data and !is_array($data)) return false;
			
			return $data[0];
		}
	}
	
	public function getCities() {
		$query = "SELECT * from cities";
		$data  = $this->Db->query($query);
		
		if(!$data) return false;
		
		return $data;
	}
	
	/*Modalidades*/
	public function modalidades($id_modalidad = false) {
		$where = "";
		if($id_modalidad != false) {
			$where = " where id_modalidad=".$id_modalidad;
		}
		
		$query = "SELECT * from modalidades" . $where;
		$data  = $this->Db->query($query);
		
		if(!$data) return false;
		
		foreach($data as $key => $value) {
			$query = "SELECT * from proyectos where id_modalidad=".$value["id_modalidad"];
			$proyectos  = $this->Db->query($query);
			$data[$key]["proyectos"] = $proyectos;
		}
		
		
		return $data;
	}
	
	/*Proyectos*/
	public function proyectos($id_modalidad = 0) {
		$query = "SELECT * from proyectos where id_modalidad=".$id_modalidad;
		$data  = $this->Db->query($query);
		
		if(!$data) return false;
		
		return $data;
	}
}
