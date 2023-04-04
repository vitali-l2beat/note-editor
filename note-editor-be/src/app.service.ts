import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Note } from './note';

@Injectable()
export class AppService {
  private readonly filePath = path.resolve(__dirname, '../data', 'data.json');

  async getNotes(): Promise<Note[]> {
    try {
      const notes: Array<Note> = await fs.readJSON(this.filePath);
      return notes;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getNoteById(id: number) {
    try {
      const notes: Array<Note> = await fs.readJSON(this.filePath);
      const note = notes.find((n) => n.id == id);
      return note;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createNote(note: Note) {
    try {
      if (!fs.existsSync(this.filePath)) {
        const notes = [];
        notes.push(note);
        await fs.writeJSON(this.filePath, notes);
      } else {
        const notes: Array<Note> = await fs.readJSON(this.filePath);
        notes.push(note);
        await fs.writeJSON(this.filePath, notes);
      }
      return note;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editNote(note: Note) {
    try {
      await this.deleteNote(note.id);
      const editedNote = await this.createNote(note);
      return editedNote;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteNote(id: number) {
    try {
      const notes: Array<Note> = await fs.readJSON(this.filePath);
      const filteredNotes = notes.filter((note) => note.id != id);
      await fs.writeJSON(this.filePath, filteredNotes);
      return filteredNotes;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
