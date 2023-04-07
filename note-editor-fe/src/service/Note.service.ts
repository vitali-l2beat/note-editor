import axios from 'axios';
import { Note } from '../models/Note';

export const getNotes = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  return data;
};

export const createNote = async (note: Note) => {
  const { data } = await axios.post(import.meta.env.VITE_API_URL, note);
  return data;
}

export const editNote = async (note: Note) => {
  const { data } = await axios.put(import.meta.env.VITE_API_URL, note);
  return data;
}

export const deleteNote: any = async (id: number) => {
  const { data } = await axios.delete(import.meta.env.VITE_API_URL + id);
  return data;
};
