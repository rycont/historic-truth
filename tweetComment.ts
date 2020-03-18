import Twitter from "twitter";
export default (client: Twitter, status: string) =>
  new Promise((resolve, reject) =>
    client.post("statuses/update", { status }, (error, tweet) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(tweet);
    })
  );
