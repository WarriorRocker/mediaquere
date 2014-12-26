<?php

/**
 * Routing short summary.
 *
 * Routing description.
 *
 * @version 1.0
 * @author robertbrown
 */

namespace MediaQuere\Web\Services;

class Routing
{
    var $router;
	var $namespace = 'MediaQuere\\Web\\Controllers';
	
	public function __construct() {
		$this->router = new \AltoRouter();
		$this->router->setBasePath('/api');
		
		$this->router->map('GET|POST', '/[a:controller]/[a:action]?/[i:id]?', 'routing');
	}
	
	public function Match() {
		$match = $this->router->match();
		if ($match) {
			$target = $this->FindClassAndMethod($match['params']);
			if (!$target['success']) {
				return $target;
			}
			
			return call_user_func(array(new $target['class'](), $target['method']), $this->GetRequestData($match['params']));
		}
		
		return array(
			'success' => false,
			'success_msg' => 'Requested route does not match any given mapping.'
		);
	}
	
	private function FindClassAndMethod($route) {
		$controller = $this->FindClass(strtolower($route['controller']).'controller');
		if (!$controller) {
			return array(
				'success' => false,
				'success_msg' => 'No controller found for '.$route['controller'].'.'
			);
		}
		
		if (!isset($route['action'])) $route['action'] = 'Index';
		$method = $this->FindMethod($controller, strtolower($route['action']));
		if (!$method) {
			return array(
				'success' => false,
				'success_msg' => 'No method found for '.$route['action'].' in controller '.$controller.'.'
			);
		}
		
		return array(
			'success' => true,
			'success_msg' => 'Successfully found class and method for route.',
			'class' => $controller,
			'method' => $method
		);
	}
	
	private function FindClass($name) {
		foreach (get_declared_classes() as $class) {
			if ((substr($class, 0, strlen($this->namespace)) == $this->namespace) && (strtolower(substr($class, -strlen($name))) == $name)) {
				return $class;
			}
		}
	}
	
	private function FindMethod($controller, $method) {
		foreach(get_class_methods($controller) as $function) {
			if ($method == strtolower($function)) {
				return $function;
			}
		}
	}
	
	private function GetRequestData($route) {
		if ((isset($route['id'])) && ($route['id'])) {
			return $route['id'];
		}
		
		$request = json_decode(file_get_contents("php://input"));
		if (is_object($request)) {
			return get_object_vars($request);
		}
	}
}
