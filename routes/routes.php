<?php

use Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes) {
	$routes->get('/crocodile', function () {
		require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

		$APPLICATION->SetTitle('Крокодил');
		$APPLICATION->IncludeComponent(
			'crocodile.game',
			'.default',
		);
	});
};
