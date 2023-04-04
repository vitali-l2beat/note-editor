import { Note } from "../../models/Note";
import "./NoteItem.scss";

interface NoteItemProps {
  note: Note;
}

export function NoteItem(props: NoteItemProps) {
  const noteTags: string[] | undefined = props.note.tags
    ?.split(" ")
    .map((tag: string) => "#" + tag);
  console.log(noteTags);

  return (
    <div className="noteItem">
      <div className="note">
        <span className="note__title">{props.note.title}</span>
        <span className="note__text">{props.note.text}</span>
        <div>{noteTags}</div>
      </div>

      <div className="buttons">
        <p className="button">Edit</p>
        <p className="button">Delete</p>
      </div>
    </div>
  );
}
