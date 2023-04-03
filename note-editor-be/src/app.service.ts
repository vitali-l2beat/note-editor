import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Note } from './note';

@Injectable()
export class AppService {

  async getNotes() {
    return 'Hello World!';
  }

  async getNoteById(id: number) {
    return 'Hello World!' + id;
  }

  async createNote(note: Note) {
    try {
      const filePath = path.resolve(__dirname, '../data', String(note.id) + '.json');

      if(!fs.existsSync(filePath)){
        const notes = []
        notes.push(note)
        await fs.writeJSON(filePath, notes);
      }

    } catch (err) {
      throw new HttpException(`internal error`, HttpStatus.BAD_REQUEST);
    }
    return note;
  }
}
