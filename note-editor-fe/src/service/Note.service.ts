import axios from "axios";

export const getNotes = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL)
  return data
}

export const deleteNote: any = async (id: number) => {
  const { data } = await axios.delete(import.meta.env.VITE_API_URL + id)
  return data;
}