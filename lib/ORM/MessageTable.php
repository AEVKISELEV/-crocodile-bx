<?php

namespace Hack\Crocodile\ORM;

use Bitrix\Main\ORM,
	Bitrix\Main\Entity\TextField,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;

class MessageTable extends DataManager
{
	public static function getTableName()
	{
		return 'hack_message';
	}

	/**
	 * @throws \Bitrix\Main\SystemException
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
				]
			),
			new IntegerField(
				'ROOM_ID',
				[
					'required' => true
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true
				]
			),
			new TextField(
				'MESSAGE',
				[
					'required' => true
				]
			),
			new ORM\Fields\Relations\Reference(
				'ROOM',
				RoomTable::class,
				ORM\Query\Join::on('this.ROOM_ID', 'ref.ID')
			),
		];
	}
}
