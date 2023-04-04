import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { Note } from './note';

@Controller('notes')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getNote() {
    return await this.appService.getNotes();
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    return await this.appService.getNoteById(Number(id));
  }

  @Post()
  async createNote(@Body() note: Note) {
    return await this.appService.createNote(note);
  }

  @Put()
  async editNote(@Body() note: Note) {
    return await this.appService.editNote(note);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return await this.appService.deleteNote(Number(id));
  }
}
