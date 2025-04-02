function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const lastRow = sheet.getLastRow();

  const newRowData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0]; 

  Logger.log("New row data: " + JSON.stringify(newRowData));
  const payload = {
    sheetName: sheet.getName(),
    dataGroup: [
      {
        id: newRowData[0], // 假設第一欄是 ID
        code: newRowData[1], // 假設第二欄是代碼
        time: newRowData[2]  // 假設第三欄是時間
      }
      // 根據需要加入其他資料
    ],
  };
  Logger.log(payload);

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
};

  const url = 'YOUR_ngrok_URL/googlesheet/server/webhook.php'; // 修改為你的伺服器 URL
  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Response code: " + response.getResponseCode());
    Logger.log("Response content: " + response.getContentText());
} catch (error) {
    Logger.log("Error: " + error.message);
}
}