'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const blogPosts = readPosts();
function readPosts() {
  const postsJSON = localStorage.getItem('posts storage');
  if (postsJSON) {
    return JSON.parse(postsJSON);
  }
  return [];
}
function entryToData() {
  data.entries = blogPosts;
}
entryToData();
