<?php

require __DIR__ . '/vendor/autoload.php';

use WebSocket\Client;

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    http_response_code(200);
    $dataGroup = $data['dataGroup'][0];
    $id = $dataGroup['id'];
    $time = $dataGroup['time'];

    if ($id !== "Device ID" && $time !== "time") {
        $response = [
            "id" => $id,
            "time" => $time
        ];
        echo json_encode($response);
        
        $wsData = json_encode($response);
        $wsUrl = 'ws://localhost:8080'; // 替換為您的 WebSocket 伺服器 URL
    
        // 使用 WebSocket 客戶端傳送資料
        $ws = new Client($wsUrl);
        $ws->send($wsData);
        $ws->close();
    } else {
        file_put_contents('data_log.json', json_encode([], JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Invalid data, JSON cleared."]);
    }

    
} else {
    http_response_code(400);
    echo "No data received.";
}