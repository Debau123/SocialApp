"use server";

import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";

//accion para el formulario de crear post
export async function createPost(formData) {

  //guardar la imagen en el bucket
  const { url } = await put("media", formData.get("media"), {
    access: "public",
  });

  //variables del contenido
  const content = formData.get("content");
 
  //guardar el post en la base de datos
  await sql`INSERT INTO POST(content, url) 
  VALUES(
    ${content}, 
    ${url})`;
}