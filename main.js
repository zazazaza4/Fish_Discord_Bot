import * as dotenv from "dotenv";
import { Fisher } from "./Fisher.js";

<<<<<<< HEAD
dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID;
const USER_ID = process.env.USER_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
=======
const CHANNEL_ID = "957364171215896646";
const USER_ID = "";
const DISCORD_TOKEN = "";
>>>>>>> cae14df4802b46732e51dead5171067953ea2597

const fisher = new Fisher("Nikola", USER_ID, DISCORD_TOKEN, CHANNEL_ID);
let humanMargin = 0;

async function main() {
  await fisher.catchFish();
  humanMargin = Math.floor(Math.random() * (10000 - 1000)) + 1000;
  setTimeout(main, 60000 + humanMargin);
}

main();
