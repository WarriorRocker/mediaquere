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

use MediaQuere\Web\Services;

class ImportController
{
    public function Index() {
		return array(
			'success' => false,
			'success_msg' => 'No import method specified.'
		);
	}
	
	public function Domain($params) {
		if (!isset($params['url'])) {
			return array(
				'success' => false,
				'success_msg' => 'No url given.'
			);
		}
		
		$importer = new Services\DomainImporter();
		return $importer->Get($params['url']);
	}
}
