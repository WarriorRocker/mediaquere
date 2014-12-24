<?php

/**
 * ImportController short summary.
 *
 * ImportController description.
 *
 * @version 1.0
 * @author robertbrown
 */

namespace MediaQuere\Web\Controllers;

class ImportController
{
    public function Index() {
	}
	
	public function Domain($domain) {
		echo $domain;
		$importer = new DomainImporter();
		print_r($importer->Get($domain));
	}
}
