<?php
	$pdo = new PDO('mysql:host=localhost;dbname=mainbd;charset=utr8', 'root', '');
	$stmt = $pdo->prepare('SELECT * FROM phones');
	$stmt->execute();
	$data = $stmt->fetchAll();
	$resj = json_encode($data);
	echo $resj;