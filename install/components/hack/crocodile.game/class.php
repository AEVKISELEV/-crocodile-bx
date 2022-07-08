<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;

Loader::includeModule('hack.crocodile');

// Loc::loadMessages(__DIR__ . '/template.php');

class HackCrocodileGame extends CBitrixComponent
{
	protected function prepareResult(): array
	{
		return [];
	}

	protected function getApplication(): CMain
	{
		global $APPLICATION;
		return $APPLICATION;
	}

	public function executeComponent()
	{
		$this->arResult = $this->prepareResult();

		$this->includeTemplate();
	}

	protected function includeTemplate(): void
	{
		$this->includeComponentTemplate();
	}

}
