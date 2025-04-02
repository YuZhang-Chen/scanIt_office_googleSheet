async function getKey() {
    const response = await fetch('../server/getEnv.php');
    const config = await response.json();

    // 檢查是否成功獲取環境變數
    if (!config.studentApiKey || !config.studentSheetId || !config.studentRange) {
        throw new Error("Missing required environment variables from server");
    }

    const studentApiKey = config.studentApiKey;
    const studentSheetId = config.studentSheetId;
    const studentRange = config.studentRange;
    const studentUrl = `https://sheets.googleapis.com/v4/spreadsheets/${studentSheetId}/values/${studentRange}?key=${studentApiKey}`;

    return studentUrl;
}

export { getKey };