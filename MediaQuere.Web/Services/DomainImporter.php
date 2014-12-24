<?php

/**
 * DomainImporter short summary.
 *
 * DomainImporter description.
 *
 * @version 1.0
 * @author robertbrown
 */
class DomainImporter
{
    public function Get($url) {
		$sheets = $this->ParseHTML($this->GetData($url));
		return $this->GetSheets($url, $sheets);
	}
	
	private function GetData($url) {
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
	
	private function ParseHTML($html) {
		@$doc = new DOMDocument();
		@$doc->loadHTML($html);
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
	
	private function GetSheets($sheets) {
		$urlparts = $this->ParseUrl($url);
		$result = [];

		foreach ($sheets as $sheet) {
			$path = $this->GetSheetUrl($urlparts, $sheet);
			
			$result[] = array(
				'name' => $sheet,
				'url' => $path,
				'data' => $this->GetData($path)
			);
		}

		return $result;
	}
	
	private function ParseUrl($url) {
		if ((strpos($url, '://') === false) && (substr($url, 0, 1) != '/')) {
			$url = 'http://' . $url;
		}
		
		return parse_url($url);
	}
	
	private function GetSheetUrl($urlparts, $sheet) {
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
}
