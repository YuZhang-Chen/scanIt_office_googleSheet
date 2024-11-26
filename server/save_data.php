<?php
// 從前端接收 JSON 格式的資料並解碼
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    // 讀取現有的資料記錄檔，若不存在則初始化為空陣列
    $existingData = json_decode(file_get_contents('data_log.json'), true) ?? [];

    // 將新資料添加到現有資料中
    $existingData[] = $data;
    // 將更新後的資料寫回資料記錄檔
    file_put_contents('data_log.json', json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // 回傳成功訊息
    echo json_encode(["message" => "Data saved successfully"]);

} else {
    // 若接收到的資料無效，回傳 400 錯誤碼及錯誤訊息
    http_response_code(400);
    echo json_encode(["message" => "Invalid data received"]);
}