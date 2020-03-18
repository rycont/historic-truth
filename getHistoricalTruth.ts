import axios from "axios";
import { JSDOM } from "jsdom";
import { Ttruth } from "./types";

export default async (): Promise<Ttruth[]> => {
  const response = await axios(
    "http://contents.history.go.kr/front/th/list.do"
  );
  const document = JSDOM.fragment(response.data);
  return [
    ...((document.querySelectorAll(
      ".today_table.mt10 tr"
    ) as unknown) as HTMLTableRowElement[])
  ]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(e => {
      const year = e.getElementsByTagName("th")[0].textContent!.trim();
      const content = e
        .getElementsByTagName("td")[0]
        .textContent!.trim()
        .split("\n");
      const source = content
        .slice(-1)
        .join("\n")
        .trim();
      const event = content.slice(0, -1)[0].trim();
      return {
        source,
        event,
        year: parseInt(year, 10)
      };
    });
};
