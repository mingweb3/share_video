import { IsNotEmpty, IsUrl } from 'class-validator';

export class InsertVideoDTO {
  @IsUrl()
  @IsNotEmpty()
  url?: string;
}
