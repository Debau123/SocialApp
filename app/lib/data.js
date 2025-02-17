import { sql } from "@vercel/postgres";


// TODO: 0 likes
export async function getPosts(){
    return (await sql
`

SELECT 
    sa_posts.post_id, 
    content, 
    url, 
    sa_posts.user_id, 
    username, 
    picture,
    count(sa_likes.user_id) as num_likes 
FROM 
    sa_posts 
    JOIN sa_users USING(user_id) 
    LEFT JOIN sa_likes USING(post_id)
GROUP BY 
    sa_posts.post_id, 
    content, 
    url, 
    sa_posts.user_id, 
    username,
    picture

`).rows;
}

// TODO: 0 likes
export async function getPost(post_id){
    return (await sql`SELECT 
    sa_posts.post_id, 
    content, 
    url, 
    sa_posts.user_id, 
    username, 
    picture,
    count(sa_likes.user_id) as num_likes 
FROM 
    sa_posts 
    JOIN sa_users USING(user_id) 
    LEFT JOIN sa_likes USING(post_id)
WHERE 
    post_id=${post_id}
GROUP BY 
    sa_posts.post_id, 
    content, 
    url, 
    sa_posts.user_id, 
    username,
    picture 
   `).rows;
}

export async function getLikes(user_id){
    return (await sql`SELECT post_id FROM sa_likes WHERE user_id = ${user_id}`).rows;
}

export async function getLike(user_id, post_id){
    return (await sql`SELECT post_id FROM sa_likes WHERE user_id = ${user_id} AND post_id=${post_id}`).rows;
}


export async function getComments(post_id) {
    return (await sql`
        SELECT 
            sa_comments.comment_id, 
            sa_comments.content, 
            sa_comments.user_id, 
            sa_comments.parent_comment_id, -- Incluimos el campo de padre
            sa_users.username  
        FROM sa_comments
        JOIN sa_users ON sa_comments.user_id = sa_users.user_id
        WHERE sa_comments.post_id = ${post_id}
        ORDER BY sa_comments.parent_comment_id NULLS FIRST, sa_comments.comment_id;
    `).rows;
}

