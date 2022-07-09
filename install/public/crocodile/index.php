<?php

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

$APPLICATION->SetTitle('Crocodile');
$APPLICATION->IncludeComponent(
	'hack:crocodile.game',
	'.default',
);

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';
