'use strict';

const express = require(`express`);
const articles = require(`./articles`);
const request = require(`supertest`);
const ArticlesService = require(`../../data-service/articles`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `hMb-ly`,
    category: [
      `Разное`,
      `Игры`,
      `Книги`
    ],
    announce: `Продаю с болью в сердце... Даю недельную гарантию. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города.`,
    title: `Продам телефон`,
    fullText: `Товар в отличном состоянии. Некоторый текст Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце... Бонусом отдам все аксессуары.`,
    createdDate: `2021-01-16 21:00:00`,
    comments: [
      {
        id: `WqEEz0`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    id: `_CWipq`,
    category: [
      `Журналы`,
      `География`,
      `Игры`
    ],
    announce: `Продаю с болью в сердце... Таких предложений больше нет! Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера!`,
    title: `Продам отличную подборку фильмов на VHS`,
    fullText: `При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Даю недельную гарантию. Бонусом отдам все аксессуары. Таких предложений больше нет! Некоторый текст`,
    createdDate: `2021-01-01 21:00:00`,
    comments: [
      {
        id: `VhAHL1`,
        text: `Это где ж такие красоты? Плюсую, но слишком много букв! `
      },
      {
        id: `ObFrAq`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного...`
      },
      {
        id: `2tC6Qe`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `CnMk41`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        id: `kRwbuI`,
        text: `Мне кажется или я уже читал это где-то?`
      },
      {
        id: `I1OFfo`,
        text: `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `IJcTwC`,
        text: `Хочу такую же футболку :-) Совсем немного...`
      },
      {
        id: `nshNor`,
        text: ` Планируете записать видосик на эту тему? Хочу такую же футболку :-)`
      }
    ]
  },
  {
    id: `3Ib77G`,
    category: [
      `Разное`,
      `Игры`,
      `Журналы`
    ],
    announce: `Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.`,
    title: `Продам новую приставку Sony Playstation 5`,
    fullText: `Даю недельную гарантию. Товар в отличном состоянии. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Бонусом отдам все аксессуары.`,
    createdDate: `2021-01-18 21:00:00`,
    comments: [
      {
        id: `sdZJVX`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new ArticlesService(cloneData));
  return app;
};


describe(`API returns a list of all posts`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(3));

  test(`First offer's id equals "bUAlOA"`, () => expect(response.body[0].id).toBe(`hMb-ly`));

});

describe(`API returns an post with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/hMb-ly`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю антиквариат"`, () => expect(response.body.title).toBe(`Продам телефон`));

});

describe(`API creates an post if data is valid`, () => {
  const newPost = {
    category: [`Книги`],
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    createdDate: `2021-01-18 21:00:00`,
    fullText: `Полный текст поста`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newPost);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newPost)));

  test(`Offers count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newPost = {
    category: [`Книги`],
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    createdDate: `2021-01-18 21:00:00`,
    fullText: `Полный текст поста`,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newPost)) {
      const badPost = {...newPost};
      delete badPost[key];
      await request(app)
        .post(`/articles`)
        .send(badPost)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent post`, () => {

  const newPost = {
    category: [`Книги`],
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    createdDate: `2021-01-18 21:00:00`,
    fullText: `Полный текст поста`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/_CWipq`)
      .send(newPost);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed post`, () => expect(response.body).toEqual(expect.objectContaining(newPost)));

  test(`Offer is really post`, () => request(app)
    .get(`/articles/_CWipq`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent post`, () => {

  const app = createAPI();

  const newPost = {
    category: [`Книги`],
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    createdDate: `2021-01-18 21:00:00`,
    fullText: `Полный текст поста`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(newPost)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an post with invalid data`, () => {

  const app = createAPI();

  const invalidPost = {
    category: [`Книги`],
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    createdDate: `2021-01-18 21:00:00`,
    fullText: `Полный текст поста`,
  };

  return request(app)
    .put(`/articles/_CWipq`)
    .send(invalidPost)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an post`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/hMb-ly`);
  });

  test(`Is status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted post`, () => expect(response.body.deletedPost.id).toBe(`hMb-ly`));
});
