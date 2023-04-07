import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit
} from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Note } from './note';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly filePath = '/tmp/data.json';

  onModuleInit() {
    if (!fs.existsSync(this.filePath)) {
      const exampleData = [
        {
          id: 'ae9c6cab-f5d3-4023-8ad0-03a8ea813a2f',
          title: 'sdasd',
          text: 'sdsads',
          tags: 'dsasd'
        },
        {
          id: '322651ea-93e6-4b67-919f-6c92cefc15c6',
          title: '321312',
          text: '321312',
          tags: '312321'
        },
        {
          id: '8621f4ca-b79e-4c08-9ab7-20afb9fb51e7',
          title: '321312',
          text: '321312',
          tags: '#312321 #21321'
        }
      ];

      fs.open(this.filePath, 'w+');
      fs.writeJson(this.filePath, exampleData);
    }
  }

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

  async getNoteById(id: string) {
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

  async deleteNote(id: string) {
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
