'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  const postsJSON = JSON.stringify(data);
  localStorage.setItem('posts storage', postsJSON);
}
data = readData();
function readData() {
  const dataJSON = localStorage.getItem('posts storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  }
  return data;
}
