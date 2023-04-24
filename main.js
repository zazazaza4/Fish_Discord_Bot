import * as dotenv from "dotenv";
import { Fisher } from "./Fisher.js";

dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID;
const USER_ID = process.env.USER_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const fisher = new Fisher("Nikola", USER_ID, DISCORD_TOKEN, CHANNEL_ID);
let humanMargin = 0;

async function main() {
  await fisher.catchFish();
  humanMargin = Math.floor((Math.random() + 109) * 9);
  setTimeout(main, 60000 + humanMargin);
}

main();
