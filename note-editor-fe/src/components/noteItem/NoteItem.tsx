import { Note } from '../../models/Note';
import { deleteNote } from '../../service/Note.service';
import { NoteTag } from '../noteTag/NoteTag';
import './NoteItem.scss';

interface NoteItemProps {
  note: Note;
}

export function NoteItem(props: NoteItemProps) {
  const noteTags: string[] | undefined = props.note.tags
    ?.split(' ')
    .map((tag: string) => tag);

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
        <p className="button">Edit</p>
        <p
          className="button"
          onClick={async () => {
            await deleteNote(props.note.id), window.location.reload();
          }}
        >
          Delete
        </p>
      </div>
    </div>
  );
}
