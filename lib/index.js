const batch = 564;
const baseUrl = 'https://wagon-chat.herokuapp.com/';

const commentForm = document.getElementById('comment-form');
const messageField = document.getElementById('your-message');
const nameField = document.getElementById('your-name');
const messagesList = document.querySelector('#messages ul');
const refreshButton = document.getElementById('refresh');

// Pseudo code
// 1. When the page loads, GET all the messages
// 2. When I click on the refresh button, GET all the messages again
// 3. When I submit the form, POST a message and GET the messages again
// 4. Automatically refresh the chat every n seconds

const fetchMessages = () => {
  fetch(`${baseUrl}/${batch}/messages`)
    .then(response => response.json())
    .then((data) => {
      messagesList.innerHTML = '';

      data.messages.forEach((message) => {
        const minutesAgo = Math.round((new Date() - new Date(message.created_at)) / 60000);
        const messageElement = `
          <li>${message.content} (posted <span class="date">${minutesAgo} minutes ago</span>) by ${message.author}</li>
        `;
        messagesList.insertAdjacentHTML('beforeend', messageElement);
      })
    });
};

const createMessage = (event) => {
  event.preventDefault();
  const author = nameField.value;
  const content = messageField.value;
  const message = {
    author: author,
    content: content
  };
  fetch(`${baseUrl}/${batch}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
  .then(() => fetchMessages());
}

fetchMessages();
refreshButton.addEventListener('click', fetchMessages);
commentForm.addEventListener('submit', createMessage);

setInterval(fetchMessages, 1000);
