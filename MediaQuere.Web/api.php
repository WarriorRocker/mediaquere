<?php

require('config.php');

use MediaQuere\Web\Services;

$routing = new Services\Routing();
echo json_encode($routing->Match());

?>