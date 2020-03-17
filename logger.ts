import {appendFile} from 'fs'
import colog from 'colog'


export function log(type, _message, _config = {}) {
    return new Promise((resolve, reject) => {
        const config = Object.assign({
            displayOnly: false
        }, _config)
        
        colog[type](_message)
        if(config.displayOnly) {
            resolve()
            return
        }
        const path = `/log/tweet/${new Date().toJSON().split('T')[0]}__twitter_log.txt`
        const message = `${new Date().toISOString()} [${type}]: ${_message}\n`
        appendFile(path,
        message, err => {
            if(err) {
                resolve(err)
                return
            }
            resolve({
                path,
                message
            })
        })
    })
}