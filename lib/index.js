// Constants
const batch = 564;
const baseUrl = "https://wagon-chat.herokuapp.com/";

// Endpoints:
// GET /:channel/messages
// POST /:channel/messages

// Pseudo code:
// 1. When the page loads, GET all messages
// 2. When I click on the refresh btn, GET all the messages again
// 3. When I submit the message form, POST a message and GET the messages again
// 4. Automatically refresh the chat every n seconds

// Elements
const messagesList = document.querySelector('#messages .list-unstyled');
const refreshButton = document.getElementById('refresh');
const commentForm = document.getElementById('comment-form');
const messageInput = document.getElementById('your-message');
const nameInput = document.getElementById('your-name');

const fetchMessages = () => {
  fetch(`${baseUrl}/${batch}/messages`)
    .then(response => response.json())
    .then((data) => {
      messagesList.innerHTML = '';

      data.messages.forEach((message) => {
        const messageElement = `<li>${message.content} (posted <span class="date">10 minutes ago</span>) by ${message.author}</li>`;
        messagesList.insertAdjacentHTML('beforeend', messageElement);
      })
    });
};

const createMessage = () => {
  const message = {
    author: nameInput.value,
    content: messageInput.value
  };
  fetch(`${baseUrl}/${batch}/messages`, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
    .then(response => response.json())
    .then(() => {
      fetchMessages();
    });
}

fetchMessages();
refreshButton.addEventListener('click', fetchMessages);
commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createMessage();
});

// Fetch the messages every 1 second
setInterval(fetchMessages, 1000);
