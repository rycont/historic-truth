import Twitter from 'twitter'
import env from 'dotenv'
import getHistoricalTruth from './getHistoricalTruth'
import tweet from './tweetComment.mjs'
env.config()

const { consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret } = process.env

const client = new Twitter({
    consumer_key, consumer_secret, access_token_key, access_token_secret
})    

getHistoricalTruth().then(list => {
    const truthes = list.sort(() => .5 - Math.random()).slice(0, 3).map(v => `역사속 오늘은...
    
${v.year}: ${v.content.length === 1 ? v.content[0] : v.content.join('\n\n')}`
    )
    truthes.forEach(v => console.log(v))
    tweet(client, truthes[0])
    tweet(client, truthes[1])
    tweet(client, truthes[2])
})

