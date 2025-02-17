'use client';

import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LikeButton from "./like-button";
import { useState } from "react";
import { createComment } from "../lib/action"; 

export default function PostSingle({ user_id, post, isLikedInitial, comments = [] }) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Estado para rastrear respuestas abiertas
  const [expandedComments, setExpandedComments] = useState({}); // Estado para manejar respuestas abiertas

  // Función para agrupar comentarios y respuestas
  const groupedComments = comments.reduce((acc, comment) => {
    if (comment.parent_comment_id) {
      acc[comment.parent_comment_id] = acc[comment.parent_comment_id] || [];
      acc[comment.parent_comment_id].push(comment);
    } else {
      acc[comment.comment_id] = acc[comment.comment_id] || [];
      acc[comment.comment_id].unshift(comment);
    }
    return acc;
  }, {});

  // Función para alternar la visibilidad de las respuestas
  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto p-4 bg-neutral-900 text-white rounded-lg shadow-md">
      {/* Imagen del post */}
      <div className="md:w-1/2 flex items-center justify-center bg-black">
        <Image src={post.url} alt={post.content} className="object-contain w-full h-auto max-h-[400px]" width={500} height={500} />
      </div>

      {/* Detalles del post y comentarios */}
      <div className="md:w-1/2 flex flex-col gap-4">
        {/* Header del post */}
        <div className="flex items-center gap-2">
          <Image src={post.picture} alt="User avatar" className="rounded-full" width={40} height={40} />
          <span className="font-semibold">{post.username}</span>
          <span className="text-gray-400 text-sm">1 día</span>
        </div>

        <p className="text-gray-300">{post.content}</p>

        {/* Botones de interacción */}
        <div className="flex gap-4 items-center">
          <LikeButton post_id={post.post_id} user_id={user_id} isLikedInitial={isLikedInitial} />
          <ChatBubbleLeftIcon className="w-8 text-gray-400" />
        </div>

        <span className="font-semibold">{post.num_likes} Me gusta</span>

        {/* Sección de comentarios */}
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-bold">Comentarios</h3>
          {Object.keys(groupedComments).length > 0 ? (
            Object.entries(groupedComments).map(([parentId, commentList]) => (
              <div key={parentId}>
                {commentList.map((comment) => (
                  <div key={comment.comment_id} className="p-2 border-b border-gray-700">
                    {/* Comentario principal */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">{comment.username}: </span>
                        <span>{comment.content}</span>
                      </div>
                      <button
                        onClick={() => {
                          toggleExpand(comment.comment_id);
                          setReplyingTo(replyingTo === comment.comment_id ? null : comment.comment_id);
                        }}
                        className="text-blue-400 text-sm"
                      >
                        {expandedComments[comment.comment_id] ? "Ocultar" : "Responder"}
                      </button>
                    </div>

                    {/* Respuestas anidadas (solo si están abiertas) */}
                    {expandedComments[comment.comment_id] && groupedComments[comment.comment_id] && (
                      <div className="ml-4 mt-2 border-l border-gray-600 pl-2">
                        {groupedComments[comment.comment_id].map((reply) => (
                          <div key={reply.comment_id} className="text-sm text-gray-400 mb-1">
                            <span className="font-bold">{reply.username}: </span>
                            <span>{reply.content}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Formulario de respuesta (se abre al hacer clic en responder) */}
                    {replyingTo === comment.comment_id && (
                      <form action={createComment} className="mt-2 ml-4">
                        <input
                          name="content"
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full border border-gray-700 rounded p-2 bg-neutral-800 text-white placeholder-gray-400"
                          placeholder="Escribe una respuesta..."
                        />
                        <input type="hidden" name="post_id" value={post.post_id} />
                        <input type="hidden" name="parent_comment_id" value={comment.comment_id} />
                        <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded">
                          Responder
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hay comentarios todavía.</p>
          )}
        </div>

        {/* Formulario para nuevo comentario principal */}
        <form action={createComment} className="mt-4">
          <input
            name="content"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-700 rounded p-2 bg-neutral-800 text-white placeholder-gray-400"
            placeholder="Añadir un comentario..."
          />
          <input type="hidden" name="post_id" value={post.post_id} />
          <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
