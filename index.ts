import Twitter from "twitter";
import { realpathSync } from "fs";
import dotenv from "dotenv";
import getHistoricalTruth from "./getHistoricalTruth";
import tweet from "./tweetComment";
import log from "./logger";
import { Ttruth } from "./types";

dotenv.config();

log("info", "env location");
log("log", `${realpathSync(".")}/./.env`);

log("headerInfo", "\n\n트윗봇 시작됨");

async function checkAndLog(key: string) {
  const requestedValue = process.env[key];
  if (!requestedValue) {
    await log("error", `${key} is ${requestedValue}`);
    await log("info", `Couldn't get ${key}, program stopped.`);
    process.exit(1);
  }
  log("info", key, {
    displayOnly: true
  });
  log("log", requestedValue, {
    displayOnly: true
  });
}

log("info", "Authentication Info..", {
  displayOnly: true
});
checkAndLog("consumer_key");
checkAndLog("consumer_secret");
checkAndLog("access_token_key");
checkAndLog("access_token_secret");

const client = new Twitter({
  consumer_key: process.env.consumer_key!,
  consumer_secret: process.env.consumer_secret!,
  access_token_key: process.env.access_token_key!,
  access_token_secret: process.env.access_token_secret!
});

function processReadiable(rawData: Ttruth[]) {
  const date = new Date();
  const today = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  return (
    rawData
      // 최종 출력 형식
      //
      //  M월 DD일 역사속 오늘은...(i / 3)
      //  YYYY년: %CONTENT%
      //  출처: %SOURCE%
      .map(
        ({ year, event, source }, i) => `${today} 역사속 오늘은... (${i +
          1} / 3)
${year}년: ${event}
출처: ${source}`
      )
  );
}

(async () => {
  const rawTruthes = await getHistoricalTruth();
  const processed = processReadiable(rawTruthes);
  log("info", "오늘의 역사적 사실..", {
    displayOnly: true
  });
  processed.forEach(truth => {
    console.log("\n", truth);
    try {
      tweet(client, truth);
      log("success", "트윗에 성공하였습니다.");
    } catch (err) {
      log("error", `트윗에 실패했습니다, ${err.message}`);
    }
  });
})();
