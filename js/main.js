'use strict';
const $entryForm = document.querySelector('.entry-form');
if (!$entryForm) throw new Error('$entryForm query failed');
const $photoURL = document.getElementById('url');
if (!$photoURL) throw new Error('$photoURL query failed');
const $holder = document.querySelector('#placeholder');
if (!$holder) throw new Error('$holder query failed');
const $formImage = document.querySelector('.form-image');
if (!$formImage) throw new Error('$formImage query failed');
const $dataView = document.querySelector('div.hidden');
if (!$dataView) throw new Error('$dataView query failed');
$photoURL.addEventListener('input', (event) => {
  const $target = event.target;
  $formImage.src = $target.value;
});
function writePosts() {
  const postsJSON = JSON.stringify(blogPosts);
  localStorage.setItem('posts storage', postsJSON);
}
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  const entry = {
    title: $formElements.title.value,
    url: $formElements.url.value,
    notes: $formElements.notes.value,
    entryID: data.nextEntryId,
  };
  blogPosts.unshift(entry);
  writePosts();
  data.nextEntryId++;
  $formImage.src = '../images/placeholder-image-square.jpg';
  $entryForm.reset();
});
