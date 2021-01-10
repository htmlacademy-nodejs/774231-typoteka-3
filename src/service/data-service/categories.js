'use strict';

class CategoriesService {
  constructor(posts) {
    this._posts = posts;
  }

  findAll() {
    const categories = this._posts.reduce((acc, post) => {
      return {...acc, ...post.category.reduce((acc2, item) => ({...acc2, [item]: item}), {})};
    }, {});

    return Object.keys(categories);
  }
}

module.exports = CategoriesService;
