'use strict';

const {Router} = require(`express`);
const {InstanceHttpApiService} = require(`../../lib/http-service`);

const myRouter = new Router();

// Страница всех публикаицй ренденр шаблона
myRouter.get(`/`, async (req, res) => {
  const articles = await InstanceHttpApiService.getArticles();
  res.render(`main`, {articles});
});

// Страница моих публикаций рендер шаблона
myRouter.get(`/my`, async (req, res) => {
  const articles = await InstanceHttpApiService.getArticles();
  res.render(`my`, {articles});
});

// Мои комментарии рендер шаблона
myRouter.get(`/my/comments`, async (req, res) => {
  const articles = await InstanceHttpApiService.getArticles();
  res.render(`comments`, {articles: articles.slice(0, 3)});
});

module.exports = {
  myRouter
};
