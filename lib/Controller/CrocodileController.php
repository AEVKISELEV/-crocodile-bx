<?php

namespace Hack\Crocodile\Controller;

use Bitrix\Main;
use CPullWatch;
use Hack\Crocodile\ORM\MessageTable;
use Hack\Crocodile\ORM\RoomTable;

class CrocodileController extends Main\Engine\Controller
{
	private array $words = [
		'рекурси€',
		'битрикс',
		'переговорка',
		'ћассажное кресло',
		'теннисный стол',
		'зарплата',
		'обед',
		'баг',
		'портал',
		'корпоратив'
	];

	public function getRoomAction()
	{
		global $USER;
		$room = $this->getRoom();
		$userID = $USER->GetID();
		CPullWatch::Add($userID, 'crocodile', true);

		if((int)$room['ARTIST_ID'] === 0)
		{
			$randomWords = $this->words[array_rand($this->words)];
			$this->updateRoom($room['ID'], $userID, $randomWords);
			return [
				'roomId' => $room['ID'],
				'artistName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
				'userName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
				'isArtist' => true,
				'word' => $randomWords,
				'userId' => $userID,
			];
		}

		$artist = $USER::GetByID((int)$room['ARTIST_ID'])->fetch();
		if ($artist['ID'] !== $userID)
		{
			return [
				'roomId' => $room['ID'],
				'artistName' => "{$artist['NAME']} {$artist['LAST_NAME']}",
				'userName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
				'isArtist' => false,
				'userId' => $userID,
			];
		}

		return [
			'roomId' => $room['ID'],
			'artistName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
			'userName' => "{$USER->GetFirstName()} {$USER->GetLastName()}",
			'isArtist' => true,
			'word' => $room['WORD'],
			'userId' => $userID,
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

	public function pushImageAction()
	{
		CPullWatch::AddToStack(
			'crocodile', [
				'module_id' => 'hack.crocodile',
				'command' => 'updateImage',
				'params' => [
					'updated' => true
				],
			]
        );
	}

	public function uploadMessageAction($roomId, $userId, $message, $userName)
	{
		$parametrs = [
			'ROOM_ID' => $roomId,
			'USER_ID' => $userId,
			'MESSAGE' => $message
		];
		MessageTable::add($parametrs);
		CPullWatch::AddToStack(
			'crocodile', [
				'module_id' => 'hack.crocodile',
				'command' => 'updateChat',
				'params' => [
					'name' => $userName,
					'message' => $message,
				],
			]
		);
	}

	private function getRoom()
	{
		$parameters = [
			'select' => ['*'],
			'limit' => 1
		];

		return RoomTable::getList($parameters)->fetch();
	}

	private function updateRoom($id, $artist_id, $word): void
	{
		$parameters = [
			'ARTIST_ID' => $artist_id,
			'WORD' => $word
		];
		RoomTable::update($id, $parameters);
	}

}