import { DiscordFishAPI } from "./DiscordFishAPI.js";
import { Logs } from "./Logs.js";
import { FileHandler } from "./FileHandler.js";
import { payloads } from "./payloads.js";

export class Fisher {
  constructor(name, userId, DISCORD_TOKEN) {
    this.name = name;
    this._userId = userId;
    this._DISCORD_TOKEN = DISCORD_TOKEN;
    this._prevMessageId = null;
    this._filePath = `./data/lastMessId_${this.name}.txt`;

    this._init();
  }

  _init() {
    this.discordApi = new DiscordFishAPI(this._userId, this._DISCORD_TOKEN);

    if (!this._prevMessageId) {
      FileHandler.readFile(this._filePath)
        .then((id) => {
          if (id) {
            this._prevMessageId = id;
          }
        })
        .catch((err) => {
          Logs.error(err);
        });
    }
  }

  async _isCanFishing() {
    let isFishing = false;

    const messages = await this.discordApi.getUserMessagesByChannelId();
    const lastMessage = messages.pop();
    if (lastMessage) {
      if (this._prevMessageId === lastMessage.id) return false;

      isFishing = lastMessage.content.includes("again!");
      this._prevMessageId = lastMessage.id;
      FileHandler.writeFile(this._filePath, this._prevMessageId);
    }

    return isFishing;
  }

  async catchFish() {
    const isFishing = await this._isCanFishing();

    if (isFishing) {
      await this.discordApi.sendCommand(payloads.fish);

      const info = await this.discordApi.getInfoByMessageId();
      if (info) {
        Logs.info(`Fished - ${info.name} - ${info.price}`);
      }
    }
  }

  async getInventory() {
    const inventory = await this.discordApi.sendCommand(payloads.inventory);
    return inventory;
  }
}
