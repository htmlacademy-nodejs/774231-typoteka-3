'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const postValidator = require(`../../middlewares/post-validator`);
const commentValidator = require(`../../middlewares/comment-validator`);
const checkPost = require(`../../middlewares/check-post`);

const articlesRouter = new Router();

module.exports = (appRouter, service) => {
  appRouter.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, (req, res) => {
    const posts = service.findAll();

    res.status(HttpCode.OK).json(posts);
  });

  articlesRouter.post(`/`, postValidator, (req, res) => {
    const newPost = service.create(req.body);

    res.status(HttpCode.CREATED).json(newPost);
  });

  articlesRouter.put(`/:articleId`, [checkPost(service), postValidator], (req, res) => {
    const {post} = res.locals;
    const editPost = service.editOne(post, req.body);

    res.status(HttpCode.OK).json(editPost);
  });

  articlesRouter.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    service.deleteOne(articleId);

    res.status(HttpCode.OK).send(`Удаление поста с id: ${articleId} прошло успешно`);
  });

  articlesRouter.get(`/:articleId/comments`, checkPost(service), (req, res) => {
    const {articleId} = req.params;

    const comments = service.findOneComments(articleId);

    return res.status(HttpCode.OK).json(comments);
  });

  articlesRouter.delete(`/:articleId/comments/:commentId`, checkPost(service), (req, res) => {
    const {articleId, commentId} = req.params;

    service.deleteComment(articleId, commentId);

    return res.status(HttpCode.OK).send(`Комментарий с id ${commentId} у поста с id ${articleId} успешно удален`);
  });

  articlesRouter.post(`/:articleId/comments`, [checkPost(service), commentValidator], (req, res) => {
    const {articleId} = req.params;
    const newComment = service.createComment(articleId, req.body);

    res.status(HttpCode.OK).json(newComment);
  });

  articlesRouter.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const post = service.findOne(articleId);

    if (!post) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id ${articleId}`);
    }

    return res.status(HttpCode.OK).json(post);
  });
};
