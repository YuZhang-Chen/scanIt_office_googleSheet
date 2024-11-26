import { startPage } from "./startPage.js";
import { getData } from "./getData.js";
import { handle } from "./handle.js";

// 當窗口加載完成時執行
window.onload = () => {
    // 將 startPage 的返回值設置為 root 元素的內部 HTML
    document.getElementById('root').innerHTML = startPage();
    
    // 創建 WebSocket 連接
    const socket = new WebSocket('ws://localhost:8080');

    // 當 WebSocket 連接打開時執行
    socket.onopen = function() {
        console.log('WebSocket connection established.');
        getData(); // 獲取數據
    }

    // 當收到 WebSocket 消息時執行
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data); // 解析收到的數據
        // console.log('Received data:', data);             
        handle(data); // 處理數據
    };

    // 當 WebSocket 連接關閉時執行
    socket.onclose = function() {
        console.log('WebSocket connection closed.');
    };

    // 當 WebSocket 發生錯誤時執行
    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
    
}