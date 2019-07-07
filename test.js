new require('twitter')({
    consumer_key: '1byDzPPgBj8uiYYZpGyW597zb',
    consumer_secret: 'IGmdgNjFpNxNQq0p5gud6JR1OJxj4U9h4RPh108xhEVmk1YQlT',
    access_token_key: '1147746633641103361-72FIvpN5aNWteXgLJkDeXSMABrc3AV',
    access_token_secret: 'uLjeAWbHuBvkqzyr3twrfWyWYwjR7nq8xlSnL1DZ0rVYg'
}).post('statuses/update', { status: '좋습니다!' }, (error, tweet, response) => {
    if (error) {
        console.log(error)
    }
    resolve(tweet)
})