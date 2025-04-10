const $entryForm = document.querySelector('.entry-form') as HTMLFormElement;
if (!$entryForm) throw new Error('$entryForm query failed');

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoURL = document.getElementById('url') as HTMLInputElement;
if (!$photoURL) throw new Error('$photoURL query failed');

const $holder = document.querySelector('#placeholder');
if (!$holder) throw new Error('$holder query failed');

const $formImage = document.querySelector('.form-image') as HTMLImageElement;
if (!$formImage) throw new Error('$formImage query failed');

const $dataView = document.querySelector('div.hidden');
if (!$dataView) throw new Error('$dataView query failed');

$photoURL.addEventListener('input', (event: Event) => {
  const $target = event.target as HTMLInputElement;
  $formImage.src = $target.value;
});

function writePosts(): any {
  const postsJSON = JSON.stringify(blogPosts);
  localStorage.setItem('posts storage', postsJSON);
}

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements as FormElements;
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
