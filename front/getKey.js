async function getKey() {
    const response = await fetch('../server/apikey.json');
    const config = await response.json();
    const studentApiKey = config.studentApiKey;
    const studentSheetId = config.studentSheetId;
    const studentRange = config.studentRange;
    const studentUrl = `https://sheets.googleapis.com/v4/spreadsheets/${studentSheetId}/values/${studentRange}?key=${studentApiKey}`;

    return studentUrl;
}

export { getKey };