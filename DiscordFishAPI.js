import https from "https";
import fetch from "node-fetch";
import { Logs } from "./Logs.js";

const BASE_URL = "https://discord.com/api/v9/channels";

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
});

export class DiscordFishAPI {
  constructor(userId, token) {
    this._userId = userId;
    this._channelId = process.env.CHANNEL_ID;
    this._token = token;
  }

  async getUserMessagesByChannelId() {
    const url = `${BASE_URL}/${this._channelId}/messages`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `${this._token}`,
        },
        agent,
      });

      const messages = await res.json();
      const messagesById = messages.filter((message) => {
        return message.content.includes(`<@${this._userId}>`);
      });

      return messagesById;
    } catch (error) {
      Logs.error(error);
      return [];
    }
  }

  async getInfoByMessageId() {
    const url = `${BASE_URL}/${this._channelId}/messages`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `${this._token}`,
        },
        agent,
      });

      const messages = await res.json();
      const infoMessage = messages.filter((message) => {
        return (
          message &&
          message.embeds[0]?.description.includes(`<@${this._userId}>`)
        );
      });

      if (infoMessage && infoMessage.length > 0) {
        const info = infoMessage.pop().embeds[0]?.description;

        const regexPrice = /\*\*\d+\.\d+ Ӿ\*\*/;
        const regexName = /\*\d+ \b\w+\b/;

        return {
          name: info.match(regexName)[0],
          price: info.match(regexPrice)[0],
        };
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  sendCommand(payload) {
    const options = {
      hostname: "discord.com",
      path: "/api/v9/interactions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(payload)),
        Authorization: this._token,
      },
    };

    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      Logs.error(error);
    });

    req.write(JSON.stringify(payload));
    req.end();
  }

  async sendMessage(content) {
    const url = `${BASE_URL}/${this._channelId}/messages`;
    const data = JSON.stringify({ content });

    const options = {
      hostname: "discord.com",
      path: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        Authorization: this._token,
      },
      agent,
    };

    try {
      const res = await fetch(url, options);
      if (res.status === 200) {
        Logs.info("Sent!");
      } else {
        Logs.error(`Received HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (error) {
      Logs.error("Failed to send message:", error);
    }
  }
}
