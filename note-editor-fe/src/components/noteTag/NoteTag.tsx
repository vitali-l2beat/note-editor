import './NoteTags.scss';

interface NoteTagProps {
  tag: string;
}

export function NoteTag(props: NoteTagProps) {
  return <div className="tag">{props.tag}</div>;
}
