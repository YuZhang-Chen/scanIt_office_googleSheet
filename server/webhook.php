<?php

require __DIR__ . '/vendor/autoload.php';

use WebSocket\Client;

// 從請求中獲取 JSON 數據並解碼
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    http_response_code(200);
    $dataGroup = $data['dataGroup'][0];
    $id = $dataGroup['id'];
    $time = $dataGroup['time'];

    // 檢查 id 和 time 是否有效
    if ($id !== "Device ID" && $time !== "time") {
        // 從 Id.json 文件中讀取 id 列表
        $id_list = json_decode(file_get_contents('./Id.json'), true) ?? [];
        if (!in_array($id, $id_list)) {
            // 如果 id 不在列表中，則添加並保存到文件
            $id_list[] = $id;
            file_put_contents('./Id.json', json_encode($id_list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

            // 構建響應數據
            $response = [
                "id" => $id,
                "time" => $time
            ];
            
            
            // 構建 WebSocket 數據並發送
        } else {
            $response = [
                "id" => null,
                "time" => null
            ];
        }
        
        echo json_encode($response);
        
        $wsData = json_encode($response);
        $wsUrl = 'ws://localhost:8080'; // 替換為您的 WebSocket 伺服器 URL
    
        // 使用 WebSocket 客戶端傳送資料
        $ws = new Client($wsUrl);
        $ws->send($wsData);
        $ws->close();

    } else {
        // 如果數據無效，清空 JSON 文件並返回消息
        file_put_contents('data_log.json', json_encode([], JSON_PRETTY_PRINT));
        file_put_contents('./Id.json', json_encode([], JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Invalid data, JSON cleared."]);
    }

    
} else {
    // 如果沒有接收到數據，返回 400 狀態碼
    http_response_code(400);
    echo "No data received.";
}