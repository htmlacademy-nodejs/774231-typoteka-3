'use strict';

const express = require(`express`);
const search = require(`./search`);
const request = require(`supertest`);
const SearchService = require(`../../data-service/search`);
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

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`Api returns data for query paramametrs search`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
                  .get(`/search`)
                  .query({query: `новую приставку`});
  });

  test(`status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 post found`, () => expect(response.body.length).toBe(1));
  test(`Post has correct id`, () => expect(response.body[0].id).toBe(`3Ib77G`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 404 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.NOT_FOUND)
);
