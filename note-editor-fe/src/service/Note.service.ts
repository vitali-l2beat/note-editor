import axios from "axios";

export const getNotes = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'notes')
  return data
}