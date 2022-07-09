<?php

/** @var array $arResult */

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

\Bitrix\Main\UI\Extension::load('hack.crocodile');
\Bitrix\Main\UI\Extension::load('pull.client');

?>

<div id="crocodile-vue-app"></div>

<script>
	BX.ready(function() {
		window.HackCrocodileApplication = new BX.Hack.Crocodile.CrocodileApplication({
			rootNodeId: 'crocodile-vue-app'
		});
		window.HackCrocodileApplication.start();
	})
</script>
