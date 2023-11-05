import { IsNotEmpty, IsNumber } from 'class-validator';

export class InsertVoteDTO {
  @IsNotEmpty()
  @IsNumber()
  videoId: number;

  @IsNotEmpty()
  value: boolean;
}
