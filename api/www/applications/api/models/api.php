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
	
	//Ejemplo
	//{"estado":6,"municipio":2,"infraestructura":"CC","A":1,"B":20,"C":1,"D":3,"E":4,"F":8,"G":8,"H":0,"I":0,"J":2,"K":15,"L":"SI","M":"SI","N":"SI"}
	
	/*Ciclovía por elemento de confinamiento*/
	public function getCC() {
		$data = null;
		
		$data[1]["precio_unitario"] = 2.24;
		$data[1]["cantidad"] = 1000*$this->options["A"]*$this->options["B"];
		
		$data[2]["precio_unitario"] = 336.65;
		$data[2]["cantidad"] = (1.3*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[3]["precio_unitario"] = 328.24;
		$data[3]["cantidad"] = (3.85*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);
		
		$data[4]["precio_unitario"] = 63.12;
		$data[4]["cantidad"] = (3.85*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);

		$data[5]["precio_unitario"] = 22.31;
		$data[5]["cantidad"] = 2*$data[4]["cantidad"];
		
		$data[6]["precio_unitario"] = 107.01;
		$data[6]["cantidad"] = (1.3*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[7]["precio_unitario"] = 10.16;
		$data[7]["cantidad"] = 20*$data[6]["cantidad"];
		
		$data[8]["precio_unitario"] = 99.93;
		$data[8]["cantidad"] = (3.85*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);
		
		$data[9]["precio_unitario"] = 9.15;
		$data[9]["cantidad"] = 20*$data[8]["cantidad"];
		
		$data[10]["precio_unitario"] = 53.3;
		$data[10]["cantidad"] = $this->options["E"]*$this->options["A"];
		
		$data[11]["precio_unitario"] = 12.49;
		$data[11]["cantidad"] = 72.5*$this->options["G"];
		
		$data[12]["precio_unitario"] = 30.75;
		$data[12]["cantidad"] = (1000*$this->options["H"]*$this->options["I"]);
		
		$data[13]["precio_unitario"] = 396.27;
		$data[13]["cantidad"] = $data[11]["cantidad"]+$data[12]["cantidad"];
		
		$data[14]["precio_unitario"] = 11.97;
		$data[14]["cantidad"] = (92.4*$this->options["G"])+(1000*$this->options["H"])+($this->options["F"]*$this->options["I"]);
		
		$data[15]["precio_unitario"] = 11.97;
		$data[15]["cantidad"] = ((1000*$this->options["H"])/3)*$this->options["I"];
		
		$data[16]["precio_unitario"] = 176.78;
		$data[16]["cantidad"] = (48.16*$this->options["G"])+(1000*$this->options["H"])+($this->options["F"]*$this->options["I"]);
		
		$data[17]["precio_unitario"] = 1.71;
		$data[17]["cantidad"] = 1000*($this->options["A"]*$this->options["B"]);
		
		$data[18]["precio_unitario"] = 8.42;
		$data[18]["cantidad"] = ((0.20*$data[17]["cantidad"])/12.5)*15;
		
		$data[19]["precio_unitario"] = 286.259999705783;
		$data[19]["cantidad"] = (1000*($this->options["A"]*$this->options["B"]))*0.2;
		
		$data[20]["precio_unitario"] = 16.3000019614381;
		$data[20]["cantidad"] = (((0.2*$data[17]["cantidad"])/12.5)*(0.9375))*20;
		
		$data[21]["precio_unitario"] = 55.23;
		$data[21]["cantidad"] = 1000*($this->options["A"]*$this->options["B"]);
		
		$data[22]["precio_unitario"] = 374.84;
		$data[22]["cantidad"] = $this->options["A"]*15;
		
		$data[23]["precio_unitario"] = 524.6;
		$data[23]["cantidad"] = $this->options["A"]*20;
		
		$data[24]["precio_unitario"] = 313.08;
		$data[24]["cantidad"] = $this->options["A"]*4;
		
		$data[25]["precio_unitario"] = 269.82;
		$data[25]["cantidad"] = $this->options["A"]*5;
		
		$data[26]["precio_unitario"] = 1988.66;
		$data[26]["cantidad"] = $this->options["A"]*1;
		
		$data[27]["precio_unitario"] = 3693.42;
		$data[27]["cantidad"] = $this->options["A"]*2;
		
		$data[28]["precio_unitario"] = 2027.44;
		$data[28]["cantidad"] = $this->options["A"]*3;
		
		$data[29]["precio_unitario"] = 2805.9;
		$data[29]["cantidad"] = $this->options["A"]*3;
		
		$data[30]["precio_unitario"] = 215.82;
		$data[30]["cantidad"] = $this->options["A"]*15;
		
		$data[31]["precio_unitario"] = 3232.01;
		$data[31]["cantidad"] = $this->options["A"]*50;
		
		$data[32]["precio_unitario"] = 718.62;
		$data[32]["cantidad"] = $this->options["A"]*50;
		
		$data[33]["precio_unitario"] = 80;
		$data[33]["cantidad"] = (7+$this->options["B"])*12;
		
		$data[34]["precio_unitario"] = 120;
		$data[34]["cantidad"] = (7+$this->options["B"])*$this->options["F"]*2;
		
		$data[35]["precio_unitario"] = 2*384.25;
		$data[35]["cantidad"] = 2*$this->options["F"];
		
		$data[36]["precio_unitario"] = 20;
		$data[36]["cantidad"] = ($this->options["A"]*1000)-(12*$this->options["F"]);
		
		$data[37]["precio_unitario"] = 20;
		$data[37]["cantidad"] = ($this->options["D"]-1)*(300*$this->options["A"])+(30*$this->options["F"]);
		
		$data[38]["precio_unitario"] = 1968.93;
		$data[38]["cantidad"] = 2*$this->options["F"];
		
		$data[39]["precio_unitario"] = 430;
		$data[39]["cantidad"] = $this->options["D"]*$this->options["F"];
		
		$data[40]["precio_unitario"] = 1377.52;
		$data[40]["cantidad"] = $this->options["F"]/3;
		
		$data[41]["precio_unitario"] = 60;
		$data[41]["cantidad"] = ($this->options["A"]*1000)-(12*$this->options["F"]);
		
		$data[42]["precio_unitario"] = 700;
		$data[42]["cantidad"] = $this->options["D"]*$this->options["F"];
		
		$data[43]["precio_unitario"] = 256.63;
		$data[43]["cantidad"] = 100*$this->options["F"];
		
		$data[44]["precio_unitario"] = 322.68;
		$data[44]["cantidad"] = $this->options["F"];
		
		$data[45]["precio_unitario"] = 47.55;
		$data[45]["cantidad"] = 60*$this->options["F"];
		
		$data[46]["precio_unitario"] = 1797.23;
		$data[46]["cantidad"] = $this->options["F"];
		
		$data[47]["precio_unitario"] = 1797.23;
		$data[47]["cantidad"] = $this->options["F"]/3;
		
		$data[48]["precio_unitario"] = 1834.81;
		$data[48]["cantidad"] = 2*$this->options["F"];
		
		$data[49]["precio_unitario"] = 1834.81;
		$data[49]["cantidad"] = $this->options["F"];
		
		$data[50]["precio_unitario"] = 1696.17;
		$data[50]["cantidad"] = $this->options["F"];
		
		$data[51]["precio_unitario"] = 1834.81;
		$data[51]["cantidad"] = $this->options["F"];
		
		$data[52]["precio_unitario"] = 739.63;
		$data[52]["cantidad"] = $this->options["A"]/3;
		
		$data[53]["precio_unitario"] = 4583.01;
		$data[53]["cantidad"] = 215*$this->options["A"];
		
		$data[54]["precio_unitario"] = 417*1.25;
		$data[54]["cantidad"] = 12*$this->options["F"];
		
		$data[55]["precio_unitario"] = 62.41;
		$data[55]["cantidad"] = ((133*$this->options["A"])*($this->options["D"]-1))+(20*$this->options["F"]);
		
		$data[56]["precio_unitario"] = 1296.73;
		$data[56]["cantidad"] = 8*$this->options["F"];
		
		$data[57]["precio_unitario"] = 4800+52600;
		$data[57]["cantidad"] = $this->options["J"];
		
		$data[58]["precio_unitario"] = 9600+52600;
		$data[58]["cantidad"] = 4*$this->options["J"];
		
		$data[59]["precio_unitario"] = 3000;
		$data[59]["cantidad"] = $this->options["K"];
		
		$result = $this->getImporte($data);
		
		return $result;
	}
	
	/*Ciclovía por cordón de estacionamiento*/
	public function getCCE() {
		$data = null;
		
		$data[1]["precio_unitario"] = 2.24;
		$data[1]["cantidad"] = 1000*$this->options["A"]*$this->options["B"];
		
		$data[2]["precio_unitario"] = 336.65;
		$data[2]["cantidad"] = (2.6*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[3]["precio_unitario"] = 328.24;
		$data[3]["cantidad"] = (7.7*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);
		
		$data[4]["precio_unitario"] = 63.12;
		$data[4]["cantidad"] = (7.7*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);

		$data[5]["precio_unitario"] = 22.31;
		$data[5]["cantidad"] = 2*$data[4]["cantidad"];
		
		$data[6]["precio_unitario"] = 107.01;
		$data[6]["cantidad"] = (2.6*$this->options["G"])+(37.5*$this->options["H"]);
		
		$data[7]["precio_unitario"] = 10.16;
		$data[7]["cantidad"] = 20*$data[6]["cantidad"];
		
		$data[8]["precio_unitario"] = 99.93;
		$data[8]["cantidad"] = (7.7*$this->options["G"])+(((1000*$this->options["H"])+($this->options["F"]*$this->options["I"]))*0.875);
		
		$data[9]["precio_unitario"] = 9.15;
		$data[9]["cantidad"] = 20*$data[8]["cantidad"];
		
		$data[10]["precio_unitario"] = 53.3;
		$data[10]["cantidad"] = $this->options["E"]*$this->options["A"];
		
		$data[11]["precio_unitario"] = 12.49;
		$data[11]["cantidad"] = 145*$this->options["G"];
		
		$data[12]["precio_unitario"] = 30.75;
		$data[12]["cantidad"] = (1000*$this->options["H"]*$this->options["I"]);
		
		$data[13]["precio_unitario"] = 396.27;
		$data[13]["cantidad"] = $data[11]["cantidad"]+$data[12]["cantidad"];
		
		$data[14]["precio_unitario"] = 11.97;
		$data[14]["cantidad"] = (184.8*$this->options["G"])+(1000*$this->options["H"])+($this->options["F"]*$this->options["I"]);
		
		$data[15]["precio_unitario"] = 11.97;
		$data[15]["cantidad"] = ((1000*$this->options["H"])/3)*$this->options["I"];
		
		$data[16]["precio_unitario"] = 176.78;
		$data[16]["cantidad"] = (96.32*$this->options["G"])+(1000*$this->options["H"])+($this->options["F"]*$this->options["I"]);
		
		$data[17]["precio_unitario"] = 1.71;
		$data[17]["cantidad"] = 1000*($this->options["A"]*$this->options["B"]);
		
		$data[18]["precio_unitario"] = 8.42;
		$data[18]["cantidad"] = ((0.20*$data[17]["cantidad"])/12.5)*15;
		
		$data[19]["precio_unitario"] = 286.259999705783;
		$data[19]["cantidad"] = (1000*($this->options["A"]*$this->options["B"]))*0.2;
		
		$data[20]["precio_unitario"] = 16.3000019614381;
		$data[20]["cantidad"] = (((0.2*$data[17]["cantidad"])/12.5)*(0.9375))*20;
		
		$data[21]["precio_unitario"] = 55.23;
		$data[21]["cantidad"] = 1000*($this->options["A"]*$this->options["B"]);
		
		$data[22]["precio_unitario"] = 374.84;
		$data[22]["cantidad"] = $this->options["A"]*15;
		
		$data[23]["precio_unitario"] = 524.6;
		$data[23]["cantidad"] = $this->options["A"]*20;
		
		$data[24]["precio_unitario"] = 313.08;
		$data[24]["cantidad"] = $this->options["A"]*4;
		
		$data[25]["precio_unitario"] = 269.82;
		$data[25]["cantidad"] = $this->options["A"]*5;
		
		$data[26]["precio_unitario"] = 1988.66;
		$data[26]["cantidad"] = $this->options["A"]*1;
		
		$data[27]["precio_unitario"] = 3693.42;
		$data[27]["cantidad"] = $this->options["A"]*2;
		
		$data[28]["precio_unitario"] = 2027.44;
		$data[28]["cantidad"] = $this->options["A"]*3;
		
		$data[29]["precio_unitario"] = 2805.9;
		$data[29]["cantidad"] = $this->options["A"]*3;
		
		$data[30]["precio_unitario"] = 215.82;
		$data[30]["cantidad"] = $this->options["A"]*15;
		
		$data[31]["precio_unitario"] = 3232.01;
		$data[31]["cantidad"] = $this->options["A"]*50;
		
		$data[32]["precio_unitario"] = 718.62;
		$data[32]["cantidad"] = $this->options["A"]*50;
		
		$data[33]["precio_unitario"] = 80;
		$data[33]["cantidad"] = (7+$this->options["B"]-2.5)*12;
		
		$data[34]["precio_unitario"] = 120;
		$data[34]["cantidad"] = (7+$this->options["B"]-2.5)*$this->options["F"]*2;
		
		$data[35]["precio_unitario"] = 2*384.25;
		$data[35]["cantidad"] = 2*$this->options["F"];
		
		$data[36]["precio_unitario"] = 20;
		$data[36]["cantidad"] = ($this->options["A"]*1000)-(12*$this->options["F"]);
		
		$data[37]["precio_unitario"] = 20;
		$data[37]["cantidad"] = ($this->options["D"]-1)*(300*$this->options["A"])+(30*$this->options["F"]);
		
		$data[38]["precio_unitario"] = 1968.93;
		$data[38]["cantidad"] = 2*$this->options["F"];
		
		$data[39]["precio_unitario"] = 430;
		$data[39]["cantidad"] = $this->options["D"]*$this->options["F"];
		
		$data[40]["precio_unitario"] = 1377.52;
		$data[40]["cantidad"] = $this->options["F"]/3;
		
		$data[41]["precio_unitario"] = 90;
		$data[41]["cantidad"] = ($this->options["A"]*1000)-(29*$this->options["F"]);
		
		$data[42]["precio_unitario"] = 700;
		$data[42]["cantidad"] = $this->options["D"]*$this->options["F"];
		
		$data[43]["precio_unitario"] = 256.63;
		$data[43]["cantidad"] = 100*$this->options["F"];
		
		$data[44]["precio_unitario"] = 322.68;
		$data[44]["cantidad"] = $this->options["F"];
		
		$data[45]["precio_unitario"] = 47.55;
		$data[45]["cantidad"] = 60*$this->options["F"];
		
		$data[46]["precio_unitario"] = 22.5;
		$data[46]["cantidad"] = 150*$this->options["F"];
		
		$data[47]["precio_unitario"] = 1797.23;
		$data[47]["cantidad"] = $this->options["F"];
		
		$data[48]["precio_unitario"] = 1797.23;
		$data[48]["cantidad"] = 2*$this->options["F"]/3;
		
		$data[49]["precio_unitario"] = 1834.81;
		$data[49]["cantidad"] = 2*$this->options["F"];
		
		$data[50]["precio_unitario"] = 1834.81;
		$data[50]["cantidad"] = $this->options["F"];
		
		$data[51]["precio_unitario"] = 1696.17;
		$data[51]["cantidad"] = $this->options["F"];
		
		$data[52]["precio_unitario"] = 1834.81;
		$data[52]["cantidad"] = $this->options["F"];
		
		$data[53]["precio_unitario"] = 739.63;
		$data[53]["cantidad"] = $this->options["A"]/3;
		
		$data[54]["precio_unitario"] = 1696.17;
		$data[54]["cantidad"] = $this->options["F"];
		
		$data[55]["precio_unitario"] = 417*1.25;
		$data[55]["cantidad"] = 166*$this->options["A"];
		
		$data[56]["precio_unitario"] = 1296.73;
		$data[56]["cantidad"] = 12*$this->options["F"];
		
		$data[57]["precio_unitario"] = 4800+52600;
		$data[57]["cantidad"] = $this->options["J"];
		
		$data[58]["precio_unitario"] = 9600+52600;
		$data[58]["cantidad"] = 4*$this->options["J"];
		
		$data[59]["precio_unitario"] = 3000;
		$data[59]["cantidad"] = $this->options["K"];
		
		$result = $this->getImporte($data);
		die(var_dump($result));
		return $result;
	}
	
	/*Carril compartido ciclista con transporte público (BusBici)*/
	public function getBB() {
		
	}
	
	/*Ciclocarril*/
	public function getCICA() {
		
	}
	
	public function getImporte($data) {
		$sum = 0;
		foreach($data as $key => $value) {
			$data[$key]["importe"] = $value["cantidad"]*$value["precio_unitario"];
			$sum += $data[$key]["importe"];
		}
		
		$data["subtotal_acomulado"] = $sum;
		
		if($this->options["L"] == "SI") {
			$data["proyecto_ejecutivo"] = $sum*0.05;
		} else {
			$data["proyecto_ejecutivo"] = 0;
		}
		
		if($this->options["M"] == "SI") {
			$data["costo_supervicion"] = $sum*0.02;
		} else {
			$data["costo_supervicion"] = 0;
		}
		
		if($this->options["N"] == "SI") {
			$data["impuesto_al_millar"] = $sum*0.002;
		} else {
			$data["impuesto_al_millar"] = 0;
		}

		$data["iva"] = ($data["subtotal_acomulado"]+$data["proyecto_ejecutivo"]+$data["costo_supervicion"]+$data["impuesto_al_millar"])*0.16;
		$data["total"] = $data["subtotal_acomulado"]+$data["proyecto_ejecutivo"]+$data["costo_supervicion"]+$data["impuesto_al_millar"]+$data["iva"];
		
		return $data;
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
