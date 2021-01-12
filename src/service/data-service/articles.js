'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class ArticlesService {
  constructor(posts) {
    this._posts = posts;
  }

  findAll() {
    return this._posts;
  }

  findOne(id) {
    const post = this._posts.find((postItem) => postItem.id === id);
    return post;
  }

  editOne(post, postBody) {
    const editPost = {
      ...post,
      ...postBody,
    };

    this._posts = this._posts.map((postItem) => {
      if (postItem.id === post.id) {
        return editPost;
      }
      return postItem;
    });

    return editPost;
  }

  deleteOne(id) {
    const deletedPost = this._posts.find((post) => post.id === id);

    if (!deletedPost) {
      return null;
    }

    this._posts = this._posts.filter((post) => post.id !== id);
    return deletedPost;
  }

  create(post) {
    const newPost = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...post,
    };

    this._posts.push(newPost);

    return newPost;
  }

  findOneComments(id) {
    const post = this.findOne(id);
    return post.comments;
  }

  deleteComment(postId, commentId) {
    this._posts = this._posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return post;
    });
  }

  createComment(postId, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    this._posts = this._posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }

      return post;
    });

    return newComment;
  }
}

module.exports = ArticlesService;

