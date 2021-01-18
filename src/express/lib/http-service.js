'use strict';

const axios = require(`axios`);
const API_PORT = process.env.API_PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || `/api`;
const BASE_URL = `http://localhost:${API_PORT}${API_PREFIX}`;

class HttpService {
  constructor(baseURL, timeout = 5000) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async request(url, options = {}) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  post(url, options = {}) {
    return this.request(url, {method: `POST`, ...options});
  }

  get(url, options = {}) {
    return this.request(url, {method: `GET`, ...options});
  }

  patch(url, options = {}) {
    return this.request(url, {method: `PATCH`, ...options});
  }

  delete(url, options = {}) {
    return this.request(url, {method: `DELETE`, ...options});
  }
}

class HttpApiService extends HttpService {
  constructor(baseURL, timeout = 5000) {
    super(baseURL, timeout);
  }

  getArticles() {
    return this.get(`/articles`);
  }

  getFindArticle(id) {
    return this.get(`/articles/${id}`);
  }

  getArticlesBySearch(query = ``) {
    return this.get(`/search`, {params: {query}});
  }

  createArticle(data) {
    return this.post(`/articles`, {data});
  }
}

module.exports = {
  InstanceHttpApiService: new HttpApiService(BASE_URL),
  HttpApiService,
};
