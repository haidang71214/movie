import { PartialType } from '@nestjs/swagger';
import { CreateMainbookDto } from './create-mainbook.dto';

export class UpdateMainbookDto extends PartialType(CreateMainbookDto) {}
