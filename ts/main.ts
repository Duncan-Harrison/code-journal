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

const $formFieldTitle = document.getElementById('form-field-title');
if (!$formFieldTitle) throw new Error('$formFieldTitle query failed');

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
  if (data.editing === null) {
    data.entries.unshift(newEntry);
    data.nextEntryId++;
    $formImage.src = '../images/placeholder-image-square.jpg';
    $entryForm.reset();
    writeData();
    $entriesList.prepend(renderEntry(newEntry));
    viewSwap('entries');
  } else {
    const update = data.editing;
    newEntry.entryID = update.entryID;
    update.title = newEntry.title;
    update.url = newEntry.url;
    update.notes = newEntry.notes;
    const correctEntry = renderEntry(update);
    const oldLi = correctEntry.closest('[data-entry-id]') as HTMLLIElement;
    console.log('oldLi: ', oldLi);
    if (oldLi) {
      oldLi.replaceWith(correctEntry);
      location.reload();
    }
    $formImage.src = '../images/placeholder-image-square.jpg';
    $entryForm.reset();
    data.editing = null;
    writeData();
    $formFieldTitle.textContent = 'New Entry';
    viewSwap('entries');
  }
});

function renderEntry(entry: Entry): HTMLLIElement {
  const row = document.createElement('li');
  row.className = 'entries-row';
  row.id = `${entry.entryID}`;
  row.setAttribute('data-entry-id', entry.entryID.toString());
  const column1 = document.createElement('div');
  column1.className = 'column-half';
  row.appendChild(column1);
  const column2 = document.createElement('div');
  column2.className = 'column-half';
  row.appendChild(column2);
  const entryImage = document.createElement('img');
  entryImage.setAttribute('src', entry.url);
  column1.appendChild(entryImage);
  const titleRow = document.createElement('div');
  titleRow.className = 'row';
  column2.appendChild(titleRow);
  const entryTitle = document.createElement('h2');
  entryTitle.textContent = entry.title;
  titleRow.appendChild(entryTitle);
  const favicon = document.createElement('i');
  favicon.className = 'fa-solid fa-pencil';
  titleRow.appendChild(favicon);
  const entryNotes = document.createElement('p');
  entryNotes.className = 'box';
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

const entries = document.querySelectorAll('.entries-row');
if (!entries) throw new Error('entries query failed');

function findEntry(entryId: number): Entry | null {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === entryId) {
      return data.entries[i];
    }
  }
  return null;
}

function prePopulate(entry: Entry): void {
  const $formElements = $entryForm.elements as FormElements;
  console.log($formElements);
  $formElements.title.value = entry.title;
  $formElements.url.value = entry.url;
  $formElements.notes.value = entry.notes;
}

$entriesList.addEventListener('click', (event: Event) => {
  const target = event.target as HTMLLIElement;
  console.log('target: ', target.className);
  if (target.className === 'fa-solid fa-pencil') {
    viewSwap('entry-form');
    $formFieldTitle.textContent = 'Edit Entry';
    const $closestLi = target.closest('[data-entry-id]') as HTMLLIElement;
    console.log($closestLi);
    if (!$closestLi) {
      throw new Error('$closestLi is null');
    }
    console.log($closestLi.dataset);
    const entryId = Number($closestLi.dataset.entryId);
    console.log(entryId);
    data.editing = findEntry(entryId);
    console.log('edit: ', data.editing);
    if (data.editing) {
      prePopulate(data.editing);
    }
  }
});
