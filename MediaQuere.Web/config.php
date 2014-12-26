<?php

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

require('References/AltoRouter/AltoRouter.php');

require('Controllers/ImportController.php');

require('Services/DomainImporter.php');
require('Services/Routing.php');

?>