document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const messageInput = document.getElementById('message-input');
  
  // Prompt for user's name
  const sender = prompt('Enter your name:');
  if (!sender) {
    alert('Please enter a valid name.');
    return;
  }


    // Connect to Socket.io server
    const socket = io();
  
    // Receive messages from the server
    socket.on('message', (data) => {
      appendMessage(data);
    });
  
    // Send messages to the server
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const message = messageInput.value;
        if (message.trim() !== '') {
          socket.emit('message', { sender, message });
          messageInput.value = '';
        }
      }
    });

     // Append a new message to the chat container
  function appendMessage(data) {
    const{sender,message}=data;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Add class based on the sender
    if (sender === sender) {
      messageElement.classList.add('sender');
      messageElement.classList.add('align-right');
    } else {
      messageElement.classList.add('receiver');
      messageElement.classList.add('align-left');
    }

    // Create separate elements for the sender and message content
    const senderElement = document.createElement('div');
    senderElement.innerText = sender;
    senderElement.classList.add('sender-name');

    const messageContentElement = document.createElement('div');
    messageContentElement.innerText = message;
    messageContentElement.classList.add('message-content');

    

    // Append sender and message content to the message element
    messageElement.appendChild(senderElement);
    messageElement.appendChild(messageContentElement);

    messageContainer.appendChild(messageElement);
  }
});