<?php

// config
$moduleName = 'hack.crocodile';

// updater initialize
global $DB, $DBType;

include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/update_class.php');

$updater = new CUpdater();
$updater->Init(
	$_SERVER['DOCUMENT_ROOT'].'/local/modules/'.$moduleName.'/',
	$DBType,
	'',
	$_SERVER['DOCUMENT_ROOT'].'/local/modules/'.$moduleName.'/module_updater.php',
	$moduleName
);

$current_version = (int)\Bitrix\Main\Config\Option::get($moduleName, '~database_schema_version', -1);

// local updaters
// if($current_version <= 0)
// {
// 	if (!$updater->TableExists('crocodile_chat'))
// 	{
// 		$updater->Query('
// 			CREATE TABLE IF NOT EXISTS up_teremok_currency
// 			(
// 				ID   int auto_increment not null unique,
// 				NAME varchar(8),
//
// 				PRIMARY KEY (ID)
// 			);
// 		');
// 	}
// 	\Bitrix\Main\Config\Option::set($moduleName, '~database_schema_version', 1);
// }
