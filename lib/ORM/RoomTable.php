<?php
namespace Up\Bitflix\Model;

use Bitrix\Main\Entity\StringField,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,

	Loc::loadMessages(__FILE__);


class RoomTable extends DataManager
{
	public static function getTableName()
	{
		return 'hack_room';
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
					'required' => true
				]
			),
			new IntegerField(
				'ARTIST_ID',
				[
					'required' => true
				]
			),
			new StringField(
				'WORD',
				[
					'required' => true
				]
			),
			new IntegerField(
				'PICTURE_ID',
				[
					'required' => true
				]
			),
			new ORM\Fields\Relations\OneToMany(
				'MESSAGES',
				MessageTable::class,
				'ROOM'
			),
		];
	}
}
