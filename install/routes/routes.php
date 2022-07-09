<?php

use Bitrix\Main\Loader;
use Hack\Crocodile\Controller\ImageController;

use Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

	$routes->post('/uploadImage', function () {
		$tmp_name = array_values($_FILES)[0]['tmp_name'];
		move_uploaded_file($tmp_name, $_SERVER['DOCUMENT_ROOT'] . "/assets/crocodile.png");
		echo 123;
	});

	$routes->get('/getCrocodileImage', function () {
		echo json_encode('data:image/jpeg;base64,'.base64_encode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/crocodile.png")));
	});

};