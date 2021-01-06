'use strict';

class CategoriesService {
  constructor(posts) {
    this._posts = posts;
  }

  findAll() {
    const categories = this._posts.reduce((acc, post) => {
      acc.add(...post.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoriesService;
