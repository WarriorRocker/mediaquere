<?php

require('config.php');

$routing = new Routing();
print_r($routing->Match());


return;

if (isset($_GET['url'])) {
	$data = get_data($_GET['url']);
	$sheets = parse_data($data);
	$result = get_sheets($_GET['url'], $sheets);
	
	echo json_encode($result);
}

function get_data($url) {
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

	$data = curl_exec($ch);
	curl_close($ch);
	
	return $data;
}

function parse_data($data) {
	@$doc = new DOMDocument();
	@$doc->loadHTML($data);
	$xml = simplexml_import_dom($doc);

	$sheets = $xml->xpath('//*[@rel="stylesheet" or @media="all" or @media="screen"]');
	$result = [];
	
	foreach ($sheets as $sheet) {
		if ($sheet->xpath('@href') != false) {
			$result[] = $sheet['href'] . '';
		}
	}

	return $result;
}

function get_sheets($url, $sheets) {
	$urlparts = get_url($url);
	$result = [];

	foreach ($sheets as $sheet) {
		$path = build_path($urlparts, $sheet);
		
		$result[] = array(
			'name' => $sheet,
			'url' => $path,
			'data' => get_data($path)
		);
	}

	return $result;
}

function get_url($url) {
	if ((strpos($url, '://') === false) && (substr($url, 0, 1) != '/')) {
		$url = 'http://' . $url;
	}
	
	return parse_url($url);
}

function build_path($url, $sheet) {
	$pos = strpos($sheet, '//');

	if ($pos === false) {
		$newurl = $url['scheme'] . '://' . $url['host'];
		if ((substr($sheet, 0, 1) != '/') && (isset($url['path']))) {
			return $newurl . $url['path'] . $sheet;
		}
		return $newurl . $sheet;
	} elseif ($pos == 0) {
		return 'http:' . $sheet;
	}
	
	return $sheet;
}

?>