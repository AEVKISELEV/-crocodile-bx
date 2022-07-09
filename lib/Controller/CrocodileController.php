<?php

namespace Hack\Crocodile\Controller;

use Bitrix\Main;
use Hack\Crocodile\ORM\RoomTable;

class CrocodileController extends Main\Engine\Controller
{
	private array $words = ['рекурсия'];

	public function editRoomAction(int $roomId, int $artistId, int $pictureId): void
	{

	}

	public function getRoomAction()
	{
		global $USER;
		$room = $this->getRoom();
		$userID = $USER->GetID();

		if ($room['ARTIST_ID'] !== 0)
		{
			$artist = $USER::GetByID($room['ID']);
			return [
				'idRoom' => $room['ID'],
				'artistName' => $artist->GetFirstName(),
				'isArtist' => false,
				'userID' => $userID,
			];
		}

		if($room['ARTIST_ID'] === 0)
		{
			$this->updateRoom($room['ID'], $userID);
			return [
				'idRoom' => $room['ID'],
				'artistName' => $USER->GetFirstName(),
				'isArtist' => true,
				'word' => $room['word'],
				'userID' => $userID,
			];
		}
		return [];
	}

	private function getRoom()
	{
		$parameters = [
			'select' => ['*'],
			'LIMIT' => 1
		];

		return RoomTable::getList($parameters)->fetch();
	}

	private function updateRoom($id, $artist_id): void
	{
		$parameters = [
			'ARTIST_ID' => $artist_id
		];
		RoomTable::update($id, $parameters);
	}

}