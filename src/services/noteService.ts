import axios from "axios";
import type { Note, createNoteRequest } from "../types/note.ts";

const BASE_URL = "https://notehub-public.goit.study/api"
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number,
  perPage?: number,
  search?: string
}

export interface FetchNotesResponse {
  notes: Note[],
  totalPages: number,
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});


export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search }: FetchNotesParams): Promise<FetchNotesResponse> => {
  
  const res = await api.get<FetchNotesResponse>(BASE_URL, {params: {page, perPage, search}});
  return res.data;
};

export const createNote = async (note: createNoteRequest): Promise<Note> => {
  const res = await api.post<Note>(BASE_URL, note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`${BASE_URL}/${id}`);
  return res.data;
}