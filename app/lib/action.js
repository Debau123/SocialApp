'use server'

import { put } from "@vercel/blob"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth0, uid } from "./auth0";


export async function createPost(formData){

    const user_id = (await auth0.getSession()).user.user_id;

    const { url } = await put(
        'media', 
        formData.get("media"), 
        { access: 'public'}
    );
    const content = formData.get('content');
    await sql`INSERT INTO sa_posts(content, url, user_id) 
        VALUES(
            ${content},
            ${url},
            ${user_id}
        )`

        revalidatePath('/');
        redirect('/');
}

export async function insertLike(post_id, user_id){

    await sql`INSERT INTO sa_likes(post_id, user_id) VALUES (
        ${post_id},  
        ${user_id}
    )`
}

export async function removeLike(post_id, user_id){

    await sql`DELETE FROM sa_likes 
        WHERE post_id = ${post_id} AND user_id = ${user_id}
    `
}
export async function createComment(formData) {
    try {
        const user_id = (await auth0.getSession()).user.user_id;

        console.log(formData);
        console.log(user_id);

        const content = formData.get('content');
        const post_id = formData.get('post_id');
        const parent_comment_id = formData.get('parent_comment_id') || null;
      // Inserta el comentario
      const result = await sql`
        INSERT INTO sa_comments (content, user_id, post_id, parent_comment_id)
        VALUES (${content}, ${user_id}, ${post_id}, ${parent_comment_id})
        RETURNING comment_id, content, user_id, post_id;
      `;
        
      revalidatePath('/post/');

    } catch (error) {
        console.error("Error al crear el comentario:", error.stack || error);
        throw new Error("No se pudo crear el comentario.");
      }
      
  }
  export async function deleteComment(comment_id) {
    try {
        await sql`
            DELETE FROM sa_comments WHERE comment_id = ${comment_id}
        `;

        revalidatePath('/post/'); // Actualiza la página después de eliminar
    } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        throw new Error("No se pudo eliminar el comentario.");
    }
}
  