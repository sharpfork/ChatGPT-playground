require('dotenv').config();

const form = document.querySelector('form');
const queryInput = document.querySelector('#query');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = queryInput.value;
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.openai.com/v1/engines/davinci-codex/search`;
  const requestBody = {
    "documents": [query],
    "query": "",
    "max_tokens": 100,
    "temperature": 0.7,
    "n": 1,
    "stop": "."
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(data => {
    const result = data.data[0].text;
    resultDiv.innerHTML = result;
  })
  .catch(error => {
    console.error('Error:', error);
    resultDiv.innerHTML = 'An error occurred while fetching data from the API.';
  });
});
