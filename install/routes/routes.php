<?php

use Bitrix\Main\Loader;
use Hack\Crocodile\Controller\ImageController;

use Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

	$routes->post('/uploadImage', function () {
		Loader::includeModule('hack.crocodile');
		$imageController = new ImageController();
		// echo $imageController->updateImage($_FILES[0]);
		echo json_encode($_FILES);
	});

};