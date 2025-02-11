import Post from "./post"

export default async ({posts, user_id, likes}) => {

    return (
        <div className="flex flex-col grow items-center gap-16">
            { 
                posts.map(post => (<Post 

                    key={post.post_id} 

                    post={post}
                    user_id={user_id} 
                    isLikedInitial={likes.find(like => like.post_id === post.post_id)}
                />))
            }
        </div>
    )
}