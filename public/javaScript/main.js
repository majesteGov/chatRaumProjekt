const userList = document.getElementById('users');
const chatForm = document.getElementById('chat-form'); //access to chatform
const roomName = document.getElementById('room-name'); //access to 
const chatMessages = document.querySelector('.chat-messages'); //chatmessage div

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true, // just need name and roomname
});

const socket = io(); // access to server

// Join chatroom
socket.emit('joinRoom', { username, room});

// Get room and users
socket.on('roomUsers', ({ room, users}) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault(); //method cancels the event if it is cancelable

  // Get message text
  sms = e.target.elements.sms.value;
  sms = sms.trim();
  if (!sms) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', sms);

  // Clear input
  e.target.elements.sms.value = '';
  e.target.elements.sms.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message'); //add the class of message(html)
  const p = document.createElement('p');
  p.innerText = message.username;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chatm').appendChild(div);
}
// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}


// var socket1 = io();
//     socket1.io('user', function(nchrcht){
//     document.getElementById("count").innerHTML= nchrcht;
//     })
