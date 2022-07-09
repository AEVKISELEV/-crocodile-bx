<?php
\Bitrix\Main\Loader::includeModule('hack.crocodile');
$controller = new \Hack\Teremok\Controller\ImageController();
// $adImages = $controller->saveImages($_FILES);

echo json_encode($_FILES);