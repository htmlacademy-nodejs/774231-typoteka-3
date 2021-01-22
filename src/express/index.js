'use strict';

const express = require(`express`);
const path = require(`path`);
const {loginRouter, registerRouter} = require(`./routes/auth`);
const {myRouter} = require(`./routes/my`);
const {searchRouter} = require(`./routes/search`);
const {articlesRouter} = require(`./routes/articles`);
const {categoriesRouter} = require(`./routes/categories`);

const app = express();

const PUBLIC_DIR = `public`;
const PORT = 8080;

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(`/`, myRouter);
app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));


app.use((_, res) => {
  res.render(`errors/404`);
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
