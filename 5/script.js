const chatURL = 'wss://ws.ifelse.io';
const sendBtn = document.querySelector('.send');
const input = document.querySelector('input');
const div = document.querySelector('.messages');
const geoBtn = document.querySelector('.geo');

let websocket;

websocket = new WebSocket(chatURL);
websocket.onopen = function(evt) {
    connectionUp();
};  

function connectionUp() {
    const status = document.querySelector('.connection');
    status.classList.toggle('connected');
}

function connectionDown() {
    const status = document.querySelector('.connection');
    status.classList.toggle('disconnected');
}

function addSentMessage(msg) {
    const divSentMessage = document.createElement('div');
    divSentMessage.classList.add('message__sent-div');
    div.appendChild(divSentMessage);
    const sentMessage = document.createElement('p');
    sentMessage.textContent = msg;
    sentMessage.classList.add('message__sent');
    divSentMessage.appendChild(sentMessage);
}

sendBtn.addEventListener('click', () => {    
    let message = input.value;
    if (message !== "") {
    addSentMessage(message);
    websocket.send(message);
    websocket.onmessage = function(evt) {
        const divServerMessage = document.createElement('div');
        divServerMessage.classList.add('message__server-div');
        div.appendChild(divServerMessage);
        const serverMessage = document.createElement('p');
        serverMessage.textContent = evt.data;
        serverMessage.classList.add('message__server');
        divServerMessage.appendChild(serverMessage);
    };     
} else {
    alert('Please type anything');
}
});

geoBtn.addEventListener('click', () => {    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const positionUrl = `https://www.openstreetmap.org/#map=19/${latitude}/${longitude}`;
            
            websocket.send(positionUrl);
            
            const divSentMessage = document.createElement('div');
            divSentMessage.classList.add('message__sent-div');
            div.appendChild(divSentMessage);
            const sentMessage = document.createElement('p');
            sentMessage.innerHTML = `<a href="${positionUrl}" target="_blank">Geolocation</a>`;
            sentMessage.classList.add('message__sent');
            divSentMessage.appendChild(sentMessage);            
          });
    }
})