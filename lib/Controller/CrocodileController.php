<?php

namespace Hack\Crocodile\Controller;

use Bitrix\Main;
use Hack\Crocodile\ORM\MessageTable;
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

		if((int)$room['ARTIST_ID'] === 0)
		{
			$this->updateRoom($room['ID'], $userID);
			return [
				'roomId' => $room['ID'],
				'artistName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
				'isArtist' => true,
				'word' => $room['WORD'],
				'userID' => $userID,
			];
		}

		$artist = $USER::GetByID((int)$room['ARTIST_ID'])->fetch();
		if ($artist['ID'] !== $userID)
		{
			return [
				'roomId' => $room['ID'],
				'artistName' => "{$artist['NAME']} {$artist['LAST_NAME']}",
				'isArtist' => false,
				'userID' => $userID,
			];
		}

		return [
			'roomId' => $room['ID'],
			'artistName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
			'isArtist' => true,
			'word' => $room['WORD'],
			'userID' => $userID,
		];
	}

	public function getChatAction($roomId): array
	{
		global $USER;
		$parameters = [
			'select' => ['*'],
			'filter' => ['ROOM_ID' => $roomId]
		];
		$messages = MessageTable::getList($parameters)->fetchAll();
		$arrayMessages = [];
		foreach ($messages as $message)
		{
			$user = $USER::GetByID($message['USER_ID'])->fetch();
			$arrayMessages[] = [
				'name' => "{$user['NAME']} {$user['LAST_NAME']}",
				'message' => $message['MESSAGE'],
			];
		}
		return $arrayMessages;
	}

	public function uploadMessageAction($roomId, $userId, $message)
	{
		$parametrs = [
			'ROOM_ID' => $roomId,
			'USER_ID' => $userId,
			'MESSAGE' => $message
		];
		MessageTable::add($parametrs);
	}

	private function getRoom()
	{
		$parameters = [
			'select' => ['*'],
			'limit' => 1
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