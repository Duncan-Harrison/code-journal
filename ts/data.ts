interface Entry {
  title: string;
  url: string;
  notes: string;
  entryID: number;
}

interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: Entry | null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [] as Entry[],
  editing: null,
  nextEntryId: 1,
};

function writeData(): any {
  const postsJSON = JSON.stringify(data);
  localStorage.setItem('posts storage', postsJSON);
}

data = readData();

function readData(): Data {
  const dataJSON = localStorage.getItem('posts storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  }
  return data;
}
