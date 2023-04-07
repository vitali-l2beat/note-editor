import { useState } from 'react';
import { Note } from '../../models/Note';
import { deleteNote, editNote } from '../../service/Note.service';
import { Modal } from '../modals/Modal';
import { NoteTag } from '../noteTag/NoteTag';
import './NoteItem.scss';

interface NoteItemProps {
  note: Note;
}

export function NoteItem(props: NoteItemProps) {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [warning, setWarning] = useState(false);
  const [title, setTitle] = useState<string>(props.note.title);
  const [text, setText] = useState<string | undefined>(props.note.text);
  const [tags, setTags] = useState<string | undefined>(props.note.tags);

  const noteTags: string[] | undefined = props.note.tags
    ?.split(' ')
    .map((tag: string) => tag);

  async function edit(title: string, text?: string, tags?: string) {
    if (title.length <= 0) {
      setWarning(true);
      return;
    }

    const newNote: Note = {
      id: props.note.id,
      title: title,
      text: text,
      tags: tags
    };

    console.log(newNote);

    await editNote(newNote);
    setModalActive(false);
  }

  return (
    <div className="noteItem">
      <div className="note">
        <span className="note__title">{props.note.title}</span>
        <span className="note__text">{props.note.text}</span>
        <div className="note__tags">
          {noteTags?.map((tag: string, index: number) => (
            <NoteTag tag={tag} key={index} />
          ))}
        </div>
      </div>

      <div className="buttons">
        <p className="button" onClick={() => setModalActive(true)}>
          Edit
        </p>
        <p
          className="button"
          onClick={async () => {
            await deleteNote(props.note.id), window.location.reload();
          }}
        >
          Delete
        </p>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <form className="newNote">
          <p className="newNote__label">Add new note</p>
          <input
            className="newNote__input"
            type="text"
            placeholder="Enter title"
            value={title}
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
            value={text}
          />
          <input
            className="newNote__input"
            id="newNote__tags"
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="newNote__notation">
            Please, use "#" character and separate tags with spaces
          </p>
          <div className="modalButtons">
            <button
              className="modalButtons__button"
              onClick={async (e) => {
                e.preventDefault(), await edit(title, text, tags), window.location.reload();
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
    </div>
  );
}
