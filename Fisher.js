import { DiscordFishAPI } from "./DiscordFishAPI.js";
import { Logs } from "./Logs.js";
import { payloads } from "./payloads.js";

export class Fisher {
  constructor(name, userId, DISCORD_TOKEN, CHANNEL_ID) {
    this.name = name;
    this._userId = userId;
    this._CHANNEL_ID = CHANNEL_ID;
    this._DISCORD_TOKEN = DISCORD_TOKEN;

    this._init();
  }

  _init() {
    this.discordApi = new DiscordFishAPI(this._userId, this._DISCORD_TOKEN);
    this._prevMessageId = null;
  }

  async _isCanFishing() {
    let isFishing = false;

    const messages = await this.discordApi.getUserMessagesByChannelId(
      this._CHANNEL_ID
    );
    const lastMessage = messages.pop();
    if (lastMessage) {
      if (this._prevMessageId === lastMessage.id) return false;

      isFishing = lastMessage.content.includes("again!");
      this._prevMessageId = lastMessage.id;
    }

    return isFishing;
  }

  async catchFish() {
    const isFishing = await this._isCanFishing();

    if (isFishing) {
      Logs.info("You can fish again!");
      this.discordApi.sendCommand(payloads.fish);
      Logs.info("Fished");
    }
  }

  async getInventory() {
    const inventory = await this.discordApi.sendCommand(payloads.inventory);
    return inventory;
  }
}
