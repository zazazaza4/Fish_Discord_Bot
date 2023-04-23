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
  }

  _isCanFishing() {
    let isFishing = false;

    this.discordApi
      .getUserMessagesByChannelId(this._CHANNEL_ID)
      .then((messages) => {
        const lastMessage = messages.pop();

        isFishing = lastMessage && lastMessage.content.includes("again!");
      });

    return isFishing;
  }

  catchFish() {
    if (this._isCanFishing()) {
      Logs.log("You can fish again!");
      this.discordApi.sendCommand(payloads.fish);
    } else {
      Log.warn(lastMessage ?? "I don`t see \\_(**)_/");
    }
  }

  getInventory() {
    this.discordApi.sendCommand(payloads.inventory);
  }
}
