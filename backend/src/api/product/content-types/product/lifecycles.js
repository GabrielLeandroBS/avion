const slugify = require('slugify');

module.exports = {

  async beforeCreate(event) {
    if (event.params.data.title) {
      event.params.data.slug = slugify(event.params.data.title, { lower: true });
    }
  },
  async beforeUpdate(event) {
    if (event.params.data.title) {
      event.params.data.slug = slugify(event.params.data.title, { lower: true });
    }
  },
};
