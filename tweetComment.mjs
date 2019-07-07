export default (client, status) => new Promise((resolve, reject) => client.post('statuses/update', { status }, (error, tweet, response) => {
    if (error) {
        console.log(error)
        reject(error)
    }
    resolve(tweet)
})) 