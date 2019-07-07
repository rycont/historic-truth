export default (client, status) => new Promise((resolve, reject) => client.post('statuses/update', { status }, (error, tweet, response) => {
    if (error) {
        reject(error)
    }
    resolve(tweet)
})) 