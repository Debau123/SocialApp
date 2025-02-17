import { sql } from "@vercel/postgres";

export default async function Seed() {
  try {
    // Crear tabla de usuarios si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS sa_users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username TEXT NOT NULL,
        name TEXT NOT NULL,
        picture TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `;

    // Crear tabla de posts si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS sa_posts (
        post_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        content TEXT NOT NULL,
        url TEXT NOT NULL,
        user_id UUID REFERENCES sa_users(user_id)
      )
    `;

    // Crear tabla de likes (pivote) si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS sa_likes (
        user_id UUID REFERENCES sa_users(user_id),
        post_id UUID REFERENCES sa_posts(post_id),
        PRIMARY KEY (user_id, post_id)
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS sa_comments (
      comment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      content TEXT NOT NULL,
      user_id UUID REFERENCES sa_users(user_id) ON DELETE CASCADE,
      post_id UUID REFERENCES sa_posts(post_id) ON DELETE CASCADE,
      parent_comment_id UUID REFERENCES sa_comments(comment_id) ON DELETE CASCADE, -- Elimina respuestas automáticamente
      created_at TIMESTAMP DEFAULT now()
    )`;
    

    return <p>Database seeded successfully.</p>;
  } catch (error) {
    console.error("Error creando las tablas:", error.message);
    return <p>Error al seedear la base de datos.</p>;
  }
}