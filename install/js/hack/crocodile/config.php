<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/crocodile.bundle.css',
	'js' => 'dist/crocodile.bundle.js',
	'rel' => [
		'main.core',
		'main.core.events',
		'ui.vue3',
	],
	'skip_core' => false,
];