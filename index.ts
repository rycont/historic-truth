interface History {
  year: number;
  content: string;
}

const getStringBetween = (source: string, start: string, end: string) =>
  source.split(start)[1]?.split(end)[0];

const getTodaysHistory = async (): Promise<History[]> => {
  const plainText =
    await (await fetch("http://contents.history.go.kr/front/th/list.do"))
      .text();
  const tableArea = getStringBetween(plainText, "</colgroup>", "</table>");
  return (tableArea.split("<tr>").slice(1).map((row) => {
    const year = +getStringBetween(row, "<th>", "</th>").trim().slice(0, -1);
    const content = getStringBetween(row, "<td>", "<div").trim().replace(
      "[음]",
      "[음력] ",
    );
    return { year, content };
  }));
};

const getRandomHistory = async (): Promise<History[]> => {
    const histories = [...await getTodaysHistory()].sort(() => 0.5 - Math.random())
    return [...histories.slice(0, 3)].sort((a, b) => b.year - a.year)
}

const formatHistory = (histories: History[]) => {
    const date = new Date()
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 역사속 오늘은📜🇰🇷
${histories.map(history => `*${history.year}년: ${history.content}`).join("\n")}`
}

getRandomHistory().then(formatHistory)
