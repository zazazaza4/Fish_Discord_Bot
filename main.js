import https from "https";
import fetch from "node-fetch";

const CHANNEL_ID = "957364171215896646";
const USER_ID = "";
const DISCORD_TOKEN = "";

function sendDiscordMessage(message) {
  const data = JSON.stringify({ content: message });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${DISCORD_TOKEN}`,
    },
  };

  const req = https.request(
    `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`,
    options,
    (res) => {
      if (res.statusCode === 200) {
        console.log("Fished!");
      } else {
        console.error(`Received HTTP ${res.statusCode}: ${res.statusMessage}`);
      }
    }
  );

  req.on("error", (error) => {
    console.error("Failed to send message:", error);
  });

  req.write(data);
  req.end();
}

setInterval(async () => {
  getMyMessages()
    .then((lastMessage) => {
      if (lastMessage) {
        if (lastMessage.content.includes("again!")) {
          console.log(lastMessage.content);
          sendDiscordMessage("/fish ");
        } else {
          console.log(lastMessage.content);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, 60000 * 5);

async function getMyMessages() {
  try {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`,
      {
        headers: {
          Authorization: `${DISCORD_TOKEN}`,
        },
      }
    );
    const messages = await res.json();

    const messageToMe = messages.filter((element) => {
      return element.content.includes(`<@${USER_ID}>`);
    });

    return messageToMe.pop();
  } catch (error) {
    console.error(error);
  }
}
