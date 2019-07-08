import Twitter from 'twitter'
import env from 'dotenv'
import getHistoricalTruth from './getHistoricalTruth'
import tweet from './tweetComment.mjs'
import { log } from './logger'
env.config()

log('headerInfo', '\n\n트윗봇 시작됨')

const keys = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
}

async function checkAndLog(key) {
    if(!keys[key]) {
        await log('error', `${key} is ${keys[key]}`)
        await log('info', `Couldn't get ${key}, program stopped.`)
        process.exit(1)
    }
    log('info', key, {
        displayOnly: true
    })
    log('log', keys[key], {
        displayOnly: true
    })
}


log('info', 'Authentication Info..', {
    displayOnly: true
})
checkAndLog('consumer_key')
checkAndLog('consumer_secret')
checkAndLog('access_token_key')
checkAndLog('access_token_secret')

log('success', '모든 인증키들을 가져오는데 성공하였습니다.')

const client = new Twitter(keys)

getHistoricalTruth().then(list => {
    const date = new Date()
    const truthes = list
        .sort(() => .5 - Math.random())
        .slice(0, 3)
        .map((v, i) => `${date.getMonth() + 1}월 ${date.getDate()}일 역사속 오늘은...(${i + 1} / 3)
    
${v.year}: ${v.content.length === 1 ? v.content[0] : v.content.join('\n\n')}`
    )
    log('info', '오늘의 역사적 사실..', {
        displayOnly: true
    })
    log('log',

        `
${'┌' + '─'.repeat(process.stdout.columns - 2) + '┐'}
${truthes.join('\n-----------\n').split('\n').map(x => '|  ' + x).join('\n')}
${'└' + '─'.repeat(process.stdout.columns - 2) + '┘\n'}`

    )
    Promise.all([tweet(client, truthes[0]), tweet(client, truthes[1]), tweet(client, truthes[2])])
        .then((i) => {
            log('success', '트윗에 성공하였습니다.')
        })
        .catch(e => log('error', JSON.stringify(e)))
}).catch(e => log('error', e))
