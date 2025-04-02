<?php
// filepath: localhost\googlesheet\server\getEnv.php

$envPath = __DIR__ . '/../.env';
if (!file_exists($envPath)) {
    http_response_code(500);
    echo json_encode(["error" => ".env file not found"]);
    exit;
}

// 將 .env 檔案的內容解析為陣列
$env = parse_ini_file($envPath);

// 返回 JSON 格式的環境變數
header('Content-Type: application/json');
echo json_encode([
    "studentApiKey" => $env['studentApiKey'] ?? null,
    "studentSheetId" => $env['studentSheetId'] ?? null,
    "studentRange" => $env['studentRange'] ?? null,
]);