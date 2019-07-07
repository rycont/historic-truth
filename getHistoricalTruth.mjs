import request from 'request'
import cheerio from 'cheerio'
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }
export default () => new Promise((resoleve, reject) => {
    console.log('음?')
    request({
        method: 'GET',
        url: 'http://contents.history.go.kr/front/th/list.do',
        headers:
        {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        }
    }, (err, res, body) => {
        if(err) reject(err)
        const $ = cheerio.load(body)
        const truthes = []
        $('.today_table.mt10 tr').each((i, el) => {
            truthes.push({
                content: $(el).children('td').text()
                    .trim()
                    .split('\n\t\t\t\t\t\n\t\t\t\n')
                    .map(v => v.split('\n\t\t\t').join('\n출처: ')),
                year: $(el).children('th').text().trim()
            })
        })
        resoleve(truthes.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
          }, []))
    })
})