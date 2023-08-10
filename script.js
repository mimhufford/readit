const shortNumberString = number => new Intl.NumberFormat("en-GB", { notation: "compact", compactDisplay: "short" }).format(number)

const posts = document.getElementById('posts')
posts.innerHTML = ''

const subreddit = `all`
fetch(`https://api.reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .then(json => {
        console.log(json.data.children)
        for (const post of json.data.children) {
            posts.innerHTML += `
                <a class='post' href='${post.data.url}' target='blank'>
                    <img class='post-thumbnail' src='${post.data.thumbnail}'>
                    <div class='post-details'>
                        <h1 class='post-title'>${post.data.title}</h1>
                        <div class='post-date'>${new Date(post.data.created_utc * 1000).toUTCString()}</div>
                    </div>
                    <div class='post-stats'>
                        <img class='post-comments-icon' src='comments.svg'>
                        <div class='post-comments'>${shortNumberString(post.data.num_comments)}</div>
                        <img class='post-score-icon' src='score.svg'>
                        <div class='post-score'>${shortNumberString(post.data.score)}</div>
                    </div>
                </a>
            `
        }
    })
    .catch(error => console.error(error))