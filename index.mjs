import Twitter from 'twitter'
import env from 'dotenv'
import getHistoricalTruth from './getHistoricalTruth'
import tweet from './tweetComment.mjs'
import {log} from './logger'
import consolog from 'colog'
env.config()

const { consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret } = process.env

const client = new Twitter({
    consumer_key, consumer_secret, access_token_key, access_token_secret
})
log('headerInfo', '트윗봇 시작됨')
log('DISPLAY:info', 'Authentication Info..')
log('DISPLAY:info', 'consumer_key')
consolog.log(consumer_key)
log('DISPLAY:info', 'consumer_secret')
consolog.log(consumer_secret)
log('DISPLAY:info', 'access_token_key')
consolog.log(access_token_key)
log('DISPLAY:info', 'access_token_secret')
consolog.log(access_token_secret)

getHistoricalTruth().then(list => {
    const date = new Date()
    const truthes = list.sort(() => .5 - Math.random()).slice(0, 3).map((v, i) => `${date.getMonth() + 1}월 ${date.getDate()}일 역사속 오늘은...(${i} / 3)
    
${v.year}: ${v.content.length === 1 ? v.content[0] : v.content.join('\n\n')}`
    )
    log('DISPLAY:info', '오늘의 역사적 사실..')
    log('log',
    
    `
${'┌' + '─'.repeat(process.stdout.columns - 2) + '┐'}
${truthes.join('\n-----------\n').split('\n').map(x => '|  ' + x).join('\n')}
${'└' + '─'.repeat(process.stdout.columns - 2) + '┘\n'}`
    
    )
    Promise.all([tweet(client, truthes[0]), tweet(client, truthes[1]), tweet(client, truthes[2])])
        .then((i) => {
            log('info', '트윗에 성공하였습니다.')
        })
        .catch(e => log('error', JSON.stringify(e)))
}).catch(e => log('info', e))
