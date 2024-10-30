import { startPage } from "./startPage.js";
import { getData } from "./getData.js";
import { handle } from "./handle.js";

window.onload = () => {
    document.getElementById('root').innerHTML = startPage();
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function() {
        console.log('WebSocket connection established.');
        getData();
    }

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        // console.log('Received data:', data);             
        handle(data);

    };

    socket.onclose = function() {
        console.log('WebSocket connection closed.');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
    
}