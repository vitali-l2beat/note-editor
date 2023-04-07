import { useState, useEffect, useMemo } from 'react';
import { Note } from '../../models/Note';
import { createNote, getNotes } from '../../service/Note.service';
import { NoteItem } from '../noteItem/NoteItem';
import './Notes.scss';
import { Modal } from '../modals/Modal';
import { v4 as uuidv4 } from 'uuid';

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [warning, setWarning] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>();
  const [tags, setTags] = useState<string | undefined>('');
  const [search, setSearch] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((data) => setNotes(data));
  }, []);

  function send(title: string, text?: string, tags?: string) {
    if (title.length <= 0) {
      setWarning(true);
      return;
    }

    const newNote: Note = {
      id: uuidv4(),
      title: title,
      text: text,
      tags: tags
    };

    setNotes([...notes, newNote]);
    createNote(newNote);
    setModalActive(false);
  }

  const getSortedNotes = useMemo( async () => {
    return await setFilteredNotes(notes.filter((note: Note) => note.tags?.includes(search)));
  }, [search]);

  return (
    <div className="notes">
      <input
        className="notes__search"
        placeholder="search by tag"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredNotes.map((note: Note, index: number) => (
        <NoteItem note={note} key={index} />
      ))}
      <Modal active={modalActive} setActive={setModalActive}>
        <form className="newNote">
          <p className="newNote__label">Add new note</p>
          <input
            className="newNote__input"
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {warning ? (
            <p className="newNote__notation">Title is required!</p>
          ) : (
            <></>
          )}

          <textarea
            className="newNote__text newNote__input"
            placeholder="Enter the text of the note"
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="newNote__input"
            id="newNote__tags"
            type="text"
            placeholder="Enter tags"
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="newNote__notation">
            Please, use "#" character and separate tags with spaces
          </p>
          <div className="modalButtons">
            <button
              className="modalButtons__button"
              onClick={(e) => {
                e.preventDefault(), send(title, text, tags);
              }}
            >
              Send
            </button>
            <button
              className="modalButtons__button"
              onClick={(e) => {
                e.preventDefault(), setModalActive(false);
              }}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
      <div className="notes__add-button" onClick={() => setModalActive(true)}>
        +
      </div>
    </div>
  );
}
