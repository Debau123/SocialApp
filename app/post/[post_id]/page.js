import { auth0 } from "@/app/lib/auth0";
import { getComments, getLike, getPost } from "@/app/lib/data"
import  PostSingle from "@/app/ui/post-single";
import { getJSDocCommentsAndTags } from "typescript";

export default async ({params}) => {
    const post_id = (await params).post_id
    const user_id = (await auth0.getSession()).user.user_id;

    const post = (await getPost(post_id))[0];
    const like = await getLike(user_id, post_id);
    const comments = await getComments(post_id);

    return (<>
        <PostSingle
            user_id={user_id} 
            post={post}
            isLikedInitial={like.length > 0} 
            comments={comments}
        />
    </>)
}