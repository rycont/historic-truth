import Twitter from "twitter";
import { realpathSync } from "fs";
import getHistoricalTruth from "./getHistoricalTruth";
import tweet from "./tweetComment";
import { log } from "./logger";
import keys from "./keys.json";

log("info", "env location");
log("log", `${realpathSync(".")}/./.env`);

log("headerInfo", "\n\n트윗봇 시작됨");

async function checkAndLog(key) {
  if (!keys[key]) {
    await log("error", `${key} is ${keys[key]}`);
    await log("info", `Couldn't get ${key}, program stopped.`);
    process.exit(1);
  }
  log("info", key, {
    displayOnly: true
  });
  log("log", keys[key], {
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

const client = new Twitter(keys);

function processReadiable(rawData) {
  const date = new Date();
  return (
    rawData
      .sort(() => 0.5 - Math.random()) // 랜덤으로 섞기
      .slice(0, 3) // 앞에서 3개만 가져오기

      // 최종 출력 형식
      //
      //  M월 DD일 역사속 오늘은...(i / 3)
      //  YYYY년: %CONTENT%
      //  출처: %SOURCE%

      .map(
        (v, i) => `${date.getMonth() +
          1}월 ${date.getDate()}일 역사속 오늘은...(${i + 1} / 3)    
${v.year}: ${v.content.length === 1 ? v.content[0] : v.content.join("\n\n")}`
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
    console.log('\n', truth);
    try {
      tweet(client, truth);
      log("success", "트윗에 성공하였습니다.");
    } catch (err) {
      log("error", "트윗에 실패했습니다");
    }
  });
})();