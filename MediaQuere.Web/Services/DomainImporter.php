<?php

/**
 * DomainImporter short summary.
 *
 * DomainImporter description.
 *
 * @version 1.0
 * @author robertbrown
 */

namespace MediaQuere\Web\Services;

class DomainImporter
{
    public function Get($url) {
		$html = $this->GetData($url);
		if (!$html) {
			return array(
				'success' => false,
				'success_msg' => 'No html returned for '.$url.'.'
			);
		}
				
		$sheets = $this->ParseHTML($html);
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
		libxml_use_internal_errors(true);
		$doc = new \DOMDocument();
		$doc->loadHTML($html);
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
	
	private function GetSheets($url, $sheets) {
		$urlparts = $this->ParseUrl($url);
		$result = [];

		foreach ($sheets as $sheet) {
			$path = $this->GetSheetUrl($urlparts, $sheet);
			$data = $this->GetData($path);
			
			$result[] = array(
				'name' => $sheet,
				'url' => $path,
				'data' => $data
			);
		
			if (preg_match_all('/url\([\'\"]([^)]+)[\'\"]\)/', $data, $matches)) {
				$urlparts = $this->ParseUrl($path);
				foreach($matches[1] as $url) {
					$path2 = $this->GetSheetUrl($urlparts, $url);
					$result[] = array(
						'name' => $url,
						'url' => $path2,
						'data' => $this->GetData($path2)
					);
				}
			}
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
			$newurl = $urlparts['scheme'] . '://' . $urlparts['host'];
			if ((substr($sheet, 0, 1) != '/') && (isset($urlparts['path']))) {
				return $newurl . substr($urlparts['path'], 0, strrpos($urlparts['path'], '/') + 1) . $sheet;
			}
			return $newurl . ((substr($sheet, 0, 1) != '/') ? '/' : '') . $sheet;
		} elseif ($pos == 0) {
			return 'http:' . $sheet;
		}
		
		return $sheet;
	}
}
