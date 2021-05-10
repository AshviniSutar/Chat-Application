
const socket = io('http://localhost:8000');

const form = document.getElementById('sendcontainer');
const msginput = document.getElementById('msginp');
const msgcontainer = document.querySelector('.container');
// const audio = new audio('ting.mp3');

const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    msgcontainer.append(messageelement);
    // if (position == 'left') {
    //     audio.play();
    // }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msginput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msginput.value=''
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name}:left the chat`, 'left')
})