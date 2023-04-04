import { useState, useEffect } from 'react'
import { Note } from '../../models/Note'
import { getNotes } from '../../service/Note.service'
import { NoteItem } from '../noteItem/NoteItem'
import './Notes.scss'

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    getNotes().then(data => setNotes(data))
  }, [])
  
  return (
    <div className='notes'>
      {notes.map((note, index) => <NoteItem note={note} key={index}/>)}
    </div>
  )
}