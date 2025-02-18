'use client';

import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LikeButton from "./like-button";
import { useState } from "react";
import { createComment, deleteComment } from "../lib/action";

export default function PostSingle({ user_id, post, isLikedInitial, comments = [] }) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});

  const handleDelete = async (commentId) => {
    if (confirm("¿Seguro que quieres eliminar este comentario?")) {
      await deleteComment(commentId);
    }
  };

  // Agrupar comentarios por parent_comment_id
  const groupedComments = comments.reduce((acc, comment) => {
    acc[comment.parent_comment_id || "root"] = acc[comment.parent_comment_id || "root"] || [];
    acc[comment.parent_comment_id || "root"].push(comment);
    return acc;
  }, {});

  // Expandir o contraer respuestas de un comentario
  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Enviar un comentario o respuesta
  const handleSubmit = async (e, parentId) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const formData = new FormData(e.target);
    await createComment(formData);

    setReplyingTo(null);
    setNewComment("");
  };

  // Renderizar comentarios anidados
  const renderComments = (parentId = "root", depth = 0) => {
    return groupedComments[parentId]?.map((comment) => (
      <div key={comment.comment_id} className={`p-2 border-b border-gray-700 ml-${depth * 4}`}>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold">{comment.username}: </span>
            <span>{comment.content}</span>
          </div>
          <div className="flex items-center gap-2">
            {groupedComments[comment.comment_id] && (
              <button 
                onClick={() => toggleExpand(comment.comment_id)} 
                className="text-blue-400 text-sm"
              >
                {expandedComments[comment.comment_id] ? "Ocultar respuestas" : `Ver respuestas (${groupedComments[comment.comment_id].length})`}
              </button>
            )}
            <button
              onClick={() => setReplyingTo(replyingTo === comment.comment_id ? null : comment.comment_id)}
              className="text-blue-400 text-sm"
            >
              Responder
            </button>
            {comment.user_id === user_id && (
              <button onClick={() => handleDelete(comment.comment_id)} className="text-red-400 text-sm">
                Eliminar
              </button>
            )}
          </div>
        </div>

        {replyingTo === comment.comment_id && (
          <form onSubmit={(e) => handleSubmit(e, comment.comment_id)} className="mt-2 ml-4">
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

        {expandedComments[comment.comment_id] && (
          <div className="ml-4 border-l border-gray-600 pl-4">
            {renderComments(comment.comment_id, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto p-4 bg-neutral-900 text-white rounded-lg shadow-md">
      <div className="md:w-1/2 flex items-center justify-center bg-black">
        <Image src={post.url} alt={post.content} className="object-contain w-full h-auto max-h-[400px]" width={500} height={500} />
      </div>

      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image src={post.picture} alt="User avatar" className="rounded-full" width={40} height={40} />
          <span className="font-semibold">{post.username}</span>
          <span className="text-gray-400 text-sm">1 día</span>
        </div>

        <p className="text-gray-300">{post.content}</p>

        <div className="flex gap-4 items-center">
          <LikeButton post_id={post.post_id} user_id={user_id} isLikedInitial={isLikedInitial} />
          
          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-8 text-gray-400" />
            <span className="text-gray-400">{comments.length}</span>
          </div>
        </div>

        <span className="font-semibold">{post.num_likes} Me gusta</span>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-bold">Comentarios: </h3>
          {renderComments()}
        </div>

        <form onSubmit={(e) => handleSubmit(e, null)} className="mt-4">
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
