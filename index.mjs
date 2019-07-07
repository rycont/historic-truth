import Twitter from 'twitter'
import env from 'dotenv'
import getHistoricalTruth from './getHistoricalTruth'
import tweet from './tweetComment.mjs'
import log from 'colog'
env.config()

const { consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret } = process.env

const client = new Twitter({
    consumer_key, consumer_secret, access_token_key, access_token_secret
})
console.log({ consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret })

getHistoricalTruth().then(list => {
    const date = new Date()
    const truthes = list.sort(() => .5 - Math.random()).slice(0, 3).map((v, i) => `${date.getMonth() + 1}월 ${date.getDate()}일 역사속 오늘은...(${i} / 3)
    
${v.year}: ${v.content.length === 1 ? v.content[0] : v.content.join('\n\n')}`
    )
    log.headerInfo('오늘의 역사적 사실..')
    truthes.forEach(v => console.log(v, '\n'))
    tweet(client, truthes[0])
    tweet(client, truthes[1])
    tweet(client, truthes[2])
})

