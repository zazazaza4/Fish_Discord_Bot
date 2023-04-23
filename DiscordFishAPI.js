import https from "https";
import fetch from "node-fetch";
import { Logs } from "./Logs.js";

const BASE_URL = "https://discord.com/api/v9/channels";

export class DiscordFishAPI {
  constructor(userId, token) {
    this._userId = userId;
    this._token = token;
  }

  async getUserMessagesByChannelId(CHANNEL_ID) {
    const url = `${BASE_URL}/${CHANNEL_ID}/messages`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `${this.token}`,
        },
      });
      const messages = await res.json();

      const messageById = messages.filter((element) => {
        return element.content.includes(`<@${this._userId}>`);
      });

      return messageById;
    } catch (error) {
      Logs.error(error);
    }
  }

  sendCommand(payloadJson) {
    const options = {
      hostname: "discord.com",
      path: "/api/v9/interactions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(payloadJson)),
        Authorization: this._token,
      },
    };

    const req = https.request(options, (res) => {
      Log.info(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      Logs.error(error);
    });

    req.write(JSON.stringify(payloadJson));
    req.end();
  }

  sendMessage(content) {
    const url = `${BASE_URL}/${CHANNEL_ID}/messages`;
    const data = JSON.stringify({ content });

    const req = https.request(url, options, (res) => {
      if (res.statusCode === 200) {
        Logs.log("Sent!");
      } else {
        Logs.error(`Received HTTP ${res.statusCode}: ${res.statusMessage}`);
      }
    });

    req.on("error", (error) => {
      Logs.error("Failed to send message:", error);
    });

    req.write(data);
    req.end();
  }
}
