const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const channelName = 'YOUR_CHANNEL_NAME';
const triggerWord = 'fileur';

const messageContainer = document.getElementById('message-container');

function showMessage() {
  messageContainer.classList.remove('hidden');
}

function hideMessage() {
  messageContainer.classList.add('hidden');
}

function handleMessage(channel, userstate, message, self) {
  if (self) return;
  if (message.toLowerCase() === triggerWord.toLowerCase()) {
    showMessage();
    setTimeout(hideMessage, 10000);
  }
}

async function main() {
  const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials', {
    method: 'POST'
  });
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  const tmiOptions = {
    options: { debug: false },
    connection: { reconnect: true },
    identity: {
      username: clientId,
      password: oauth:${accessToken}
    },
    channels: [channelName]
  };

  const client = new tmi.Client(tmiOptions);
  client.connect();

  client.on('message', handleMessage);
