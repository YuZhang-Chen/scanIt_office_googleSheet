import { getKey } from "./getKey.js";
import { formatIsoDate } from "./formatIsoDate.js";

async function handle(data) {
    try {
        const studentUrl = await getKey();
        const response2 = await fetch(studentUrl); // 參與名單
        let studentList = await response2.json();
        // console.log("數據已取得：", studentList); 

        const nameList = studentList['values'];

        const id = data['id'];
        const time = formatIsoDate(data['time']);
        let target = null;

        for (let i = 0; i < nameList.length; i++) {
            const element = nameList[i];
            if (element[1] == id) {
                target = `
                <div class="student-entry">
                <span class="student-name">${element[0]}</span>
                <span class="timestamp">${time}</span>
            </div><br>
                `;

                const data = {
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

        if (target) {
            document.getElementById('content').innerHTML += `${target}`;
        } else {
            console.warn(`No matching student found for ID: ${id}`);
        }


    } catch (error) {
        console.error("Error2", error);
        
    }
}

export { handle };