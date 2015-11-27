<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct() {
		parent::__construct();
		
		$this->load->database();
		
		//Helpers
		$this->load->helper('url');
		$this->load->helper('date');
		
		ini_set("session.cookie_lifetime", "14400");
		ini_set("session.gc_maxlifetime",  "14400");
		session_start();
		
		$this->latitude = null;
		$this->longitude = null;
	}

	public function new_crud() {
        $db_driver = $this->db->platform();
        $model_name = 'grocery_crud_model_'.$db_driver;
        $model_alias = 'm'.substr(md5(rand()), 0, rand(4,15) );

        unset($this->{$model_name});
        $this->load->library('grocery_CRUD');
        $crud = new Grocery_CRUD();
        if (file_exists(APPPATH.'/models/'.$model_name.'.php')){
            $this->load->model('grocery_crud_model');
            $this->load->model('grocery_crud_generic_model');
            $this->load->model($model_name,$model_alias);
            $crud->basic_model = $this->{$model_alias};
        }
        return $crud;
    }
    
	/*Salida de las vistas*/
	public function _example_output($output = null) {
		$this->load->view('admin.php', $output);
	}
	
	/*Users metodo para verificar si es usuario*/
	private function isUser($redirect = true, $admin = false) {
		if(isset($_SESSION['user_id'])) {
			$user_id = $_SESSION['user_id'];
			
			$this->load->model('emus_model');
			$user = $this->emus_model->getUser($_SESSION['user_id']);
			
			if($user) {
				
				return $user;
				
				if($redirect) {
					header('Location: ' . site_url('admin/proyectos'));
				}
				
				return $user;
			} else {
				if($redirect) {
					header('Location: ' . site_url('admin/login'));
				}
				
				return false;
			}
		} else {
			if($redirect) {
				header('Location: ' . site_url('admin/login'));
			}
			
			return false;
		}
	}
	
	/*Metodo para hacer login*/
	public function login() {
		if($this->isUser(false)) {
			header('Location: ' . site_url('admin/proyectos'));
		} else {
			$vars["error"] = false;
			
			if(isset($_POST["submit"])) {
				$this->load->model('emus_model');
				$user = $this->emus_model->isUser(trim(str_replace("'","",$_POST["email"])), md5($_POST["pwd"]));
				
				if($user) {
					$_SESSION['user_id'] = $user->id_user;
					$_SESSION['email']   = $user->email;
					
					header('Location: ' . site_url('admin/proyectos'));
				}
				
				$vars["error"] = "data error";
			}
			
			$this->load->view('login.php', $vars);
		}
	}
	
	/*Proyectos*/
	public function proyectos() {
		$user  = $this->isUser();
		$crud  = $this->new_crud();
		$state = $crud->getState();
		
		/*Tabla y título*/
		$crud->set_theme('datatables');
		$crud->set_table('proyectos');
		$crud->set_subject('Proyectos');
		$crud->set_primary_key('id_proyecto');
		$crud->unset_fields('id_proyecto', 'created_at', 'updated_at', 'status');
		//$crud->unset_delete();
		
		$crud->fields('id_modalidad', 'nombre', 'descripcion', 'imagen_url', 'calculadora', 'estatus');
		$crud->columns('id_modalidad',  'nombre', 'imagen_url', 'calculadora', 'estatus');
		
		/*Modalidad*/
		$crud->set_primary_key('id_modalidad', 'modalidades');
		$crud->display_as('id_modalidad', 'Modalidad');
		$crud->set_relation('id_modalidad', 'modalidades', 'nombre');
		
		/*Imagen 1*/
		$crud->display_as('imagen_url', 'Imagen');
		$crud->set_field_upload('imagen_url', 'assets/uploads/files');
        
        /*Status*/
        $crud->field_type('estatus', 'dropdown', array('inactivo' => 'Inactivo', 'Activo' => 'Activo'));
        
        /*Calculadora*/
        $crud->field_type('calculadora', 'dropdown', array('Inactivo' => 'Inactivo', 'Activo' => 'Activo'));
		
		$output = $crud->render();
		
		$this->_example_output($output);
	}
	
	/*Metodo para cerrar session*/
	public function logout() {
		session_unset(); 
		session_destroy();
		
		header('Location: ' . site_url('admin/login'));
	}
	
	/*metodo index - redirect a marcas*/
	public function index() {
		header('Location: ' . site_url('admin/proyectos'));
		
		return false;
	}
}
