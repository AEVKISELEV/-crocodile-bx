<?php

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

$APPLICATION->IncludeComponent(
	'crocodile.game',
	'.default',
);

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';
