'use strict';

const {Router} = require(`express`);
const {InstanceHttpApiService} = require(`../../lib/http-service`);
const {storage} = require(`../../lib/upload-storage`);
const multer = require(`multer`);
const url = require(`url`);

const articlesRouter = new Router();
const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});

articlesRouter.get(`/add`, (req, res) => {
  res.render(`new-post`, {formData: {...req.query}});
});

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body} = req;

  const newArticle = {
    title: body.title,
    category: [],
    announce: body.announcement,
    fullText: body.fullText,
    createdDate: body.createdDate,
  };

  try {
    await InstanceHttpApiService.createArticle(newArticle);
    res.redirect(`/my`);
  } catch (err) {
    console.log(`POST /articles/add: `, err);
    res.redirect(url.format({
      pathname: `/articles/add`,
      query: {
        ...body,
      }
    }));
  }
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  res.send(req.originalUrl);
});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const article = await InstanceHttpApiService.getFindArticle(id);
    res.render(`post`, {article});
  } catch (err) {
    res.redirect(`/notFound`);
  }
});

module.exports = {
  articlesRouter
};
