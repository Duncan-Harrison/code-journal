const $dataFormView = document.querySelector('#data-form-view');
if (!$dataFormView) throw new Error('$dataFormView query failed');

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

const $dataView = document.querySelector('#feed');
if (!$dataView) throw new Error('$dataView query failed');

const $entriesList = document.querySelector('.entries-list');
if (!$entriesList) throw new Error('$entriesList query failed');

const $noEntry = document.querySelector('#no-entry');
if (!$noEntry) throw new Error('$noEntry query failed');

const $entriesTab = document.querySelector('#entries-tab');
if (!$entriesTab) throw new Error('$entriesTab query failed');

const $formTab = document.querySelector('#form-tab');
if (!$formTab) throw new Error('$entriesTab query failed');

$photoURL.addEventListener('input', (event: Event) => {
  const $target = event.target as HTMLInputElement;
  $formImage.src = $target.value;
});

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements as FormElements;
  const formTitle: string = $formElements.title.value;
  const formUrl: string = $formElements.url.value;
  const formNotes: string = $formElements.notes.value;
  const newEntry: Entry = {
    title: formTitle,
    url: formUrl,
    notes: formNotes,
    entryID: data.nextEntryId,
  };
  data.entries.unshift(newEntry);
  data.nextEntryId++;
  $formImage.src = '../images/placeholder-image-square.jpg';
  $entryForm.reset();
  writeData();
  $entriesList.prepend(renderEntry(newEntry));
  viewSwap('entries');
});

function renderEntry(entry: Entry): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'entries-row';
  const column1 = document.createElement('div');
  column1.className = 'column-half';
  row.appendChild(column1);
  const column2 = document.createElement('div');
  column2.className = 'column-half';
  row.appendChild(column2);
  const entryImage = document.createElement('img');
  entryImage.setAttribute('src', entry.url);
  column1.appendChild(entryImage);
  const entryTitle = document.createElement('h2');
  entryTitle.textContent = entry.title;
  column2.appendChild(entryTitle);
  const entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  column2.appendChild(entryNotes);
  return row;
}

document.addEventListener('DOMContentLoaded', () => {
  viewSwap('entries');
  for (let i = 0; i < data.entries.length; i++) {
    const v = renderEntry(data.entries[i]);
    $entriesList.append(v);
  }
});

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    if ($noEntry != null) {
      $noEntry.className = '';
    }
  } else {
    if ($noEntry != null) {
      $noEntry.className = 'hidden';
    }
  }
}

function viewSwap(view: Data['view']): void {
  if (view === 'entries' && $dataFormView != null && $dataView != null) {
    $dataView.className = '';
    $dataFormView.className = 'hidden';
    toggleNoEntries();
  } else if (
    view === 'entry-form' &&
    $dataFormView != null &&
    $dataView != null
  ) {
    $dataView.className = 'hidden';
    $dataFormView.className = '';
  }
}

$entriesTab.addEventListener('click', (event: Event) => {
  const eventTarget = event.target;
  if (eventTarget === $entriesTab) {
    viewSwap('entries');
  }
});

$formTab.addEventListener('click', (event: Event) => {
  const eventTarget = event.target;
  if (eventTarget === $formTab) {
    viewSwap('entry-form');
  }
});
