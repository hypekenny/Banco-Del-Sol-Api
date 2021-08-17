import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';

@Controller('contacts')
// @UseGuards(AuthGuard('jwt'))
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get(':email')
  async getContact(@Res() res, @Param('email') param) {
    try {
      console.log(param);
      const contact = await this.contactsService.getContact(param);
      if (!contact)
        throw { error: { message: 'No se ha encontrado el contacto' } };
      return res.status(HttpStatus.OK).json(contact);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }

  @Get()
  async getAll(@Res() res) {
    try {
      const contacts = await this.contactsService.getAll();
      return res.status(HttpStatus.OK).json(contacts);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }
}
