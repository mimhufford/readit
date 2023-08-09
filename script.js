
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
                        <div class='post-comments'>${post.data.num_comments} comments</div>
                        </div>
                    <span class='post-score'>${post.data.score}</span>
                </a>
            `
        }
    })
    .catch(error => console.error(error))