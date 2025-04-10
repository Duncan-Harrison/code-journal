const data = {
  view: 'entry-form',
  entries: [] as object[],
  editing: null,
  nextEntryId: 1,
};

interface Entry {
  title: string;
  url: string;
  notes: string;
}

const blogPosts: Entry[] = readPosts();

function readPosts(): Entry[] {
  const postsJSON = localStorage.getItem('posts storage');
  if (postsJSON) {
    return JSON.parse(postsJSON);
  }
  return [];
}

function entryToData(): any {
  data.entries = blogPosts;
}

entryToData();
