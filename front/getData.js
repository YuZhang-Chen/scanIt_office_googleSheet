// 刷新頁面時，如果data_log.json裡有之前的資料，就先將它們顯示出來

async function getData() {
    try {
        const response = await fetch('../server/data_log.json');
        const data = await response.json();
        // console.log('Loaded Data:', data); //顯示data_log.json已存在的資料;
        data.forEach(element => {                  
            const target = `
            <div class="student-entry">
            <div class="info">
                <span class="student-title">${element['title']}</span>
                <span class="student-name">${element['name']}</span>
            </div>
            <span class="timestamp">${element['time']}</span>
        </div>
        <br>`
            document.getElementById('content').innerHTML += target;
        });
    } catch (error) {
        //
    }
}

export { getData };