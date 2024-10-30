<?php

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $existingData = json_decode(file_get_contents('data_log.json'), true) ?? [];

    $existingData[] = $data;
    file_put_contents('data_log.json', json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(["message" => "Data saved successfully"]);

} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid data received"]);
}