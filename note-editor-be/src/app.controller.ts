import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getData() {
    return await this.appService.getNotes();
  }

  @Get(':id')
  async getDataById(@Param('id') id: string) {
    return await this.appService.getNoteById(Number(id));
  }

  @Post()
  async createNote(@Body() note: any) {
    return await this.appService.createNote(note);
  }
}
