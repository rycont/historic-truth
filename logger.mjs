import fs from 'fs'
import colog from 'colog'
const stream = fs.createWriteStream(`/log/tweet/${new Date().toJSON().split('T')[0]}__twitter_log.txt`, {
    flags: 'a'
})

export function log(type, message) {
    if(type.includes('DISPLAY:')) {
        colog[type.split('Y:')[1]](message)
        return
    }
    colog[type](message)
    stream.write(`${new Date().toISOString()} [${type}]: ${message}\n`)
}