import { getKey } from "./getKey.js";
import { formatIsoDate } from "./formatIsoDate.js";

// 處理數據的主函數
async function handle(data) {
    try {
        // 獲取人員名單的 URL
        const studentUrl = await getKey();
        // 從 URL 獲取人員名單數據
        const response2 = await fetch(studentUrl); // 參與名單
        let studentList = await response2.json();
        console.log("數據已取得：", studentList); 

        // 提取人員名單中的值
        const nameList = studentList['values'];

        // 從傳入的數據中提取 ID 和時間
        const id = data['id'];
        const time = formatIsoDate(data['time']);
        let target = null;

        // 遍歷人員名單，查找匹配的人員
        for (let i = 0; i < nameList.length; i++) {
            const element = nameList[i];
            if (element[2] == id) {
                // 如果找到匹配的ID，構建 HTML 內容
                const title = element[1];
                const name = element[0];
                target = `
                <div class="student-entry highlight">
                <div class="info">
                    <span class="student-title">${title}</span>
                    <span class="student-name">${name}</span>
                </div>
                <div class="details">
                    <span class="timestamp">${time}</span>
                </div>
            </div>
            <br>
                `;
                
                // 構建要發送到伺服器的數據
                const data = {
                    title: element[1],
                    name: element[0],
                    time: time
                };
        
                // 發送 POST 請求給 PHP 伺服器
                fetch('../server/save_data.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(result => {
                    console.log('Data saved:', result);
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
                break;
            }
        }

        // 如果找到匹配的人員，將 HTML 內容添加到頁面
        if (target) {
            document.getElementById('content').innerHTML = `${target}` + document.getElementById('content').innerHTML;
            const targetElement = document.querySelector('.student-entry.highlight');

            setTimeout(() => {
                targetElement.classList.remove('highlight');
            }, 3000);

        } else {
            console.warn(`No matching student found for ID: ${id}`);
        }

    } catch (error) {
        console.error("Error2", error);
    }
}

export { handle };