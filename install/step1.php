<?php
if (!check_bitrix_sessid()) {
	return;
}
?>
<?php
global $errors;

if ((!is_array($errors) && strlen($errors) <= 0) || (is_array($errors) && count($errors) <= 0)):
	echo CAdminMessage::ShowNote(GetMessage("MOD_INST_OK"));
else:
	$alErrors = "";
	for ($i = 0, $iMax = count($errors); $i < $iMax; $i++)
	{
		$alErrors .= $errors[$i] . "<br>";
	}
	echo CAdminMessage::ShowMessage(
		["TYPE" => "ERROR", "MESSAGE" => GetMessage("MOD_INST_ERR"), "DETAILS" => $alErrors, "HTML" => true]
	);
endif;
if ($ex = $APPLICATION->GetException())
{
	echo CAdminMessage::ShowMessage(
		[
			"TYPE" => "ERROR",
			"MESSAGE" => GetMessage("MOD_INST_ERR"),
			"HTML" => true,
			"DETAILS" => $ex->GetString()
		]);
}
?>
<form action="<?php
echo $APPLICATION->GetCurPage() ?>">
	<input type="hidden" name="lang" value="<?php
	echo LANG ?>">
	<input type="submit" name="" value="<?php
	echo GetMessage("MOD_BACK") ?>">
</form>
