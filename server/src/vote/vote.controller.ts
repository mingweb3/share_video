import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { VoteService } from './vote.service';
import { GetUser } from 'src/auth/decorator';
import { InsertVoteDTO } from './dto';
import { MJwtGuard } from 'src/auth/guard';
import { PaginationParamsDto } from 'src/sharedDto';

@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @UseGuards(MJwtGuard)
  @Get()
  getVotes(@Query() { page, limit }: PaginationParamsDto) {
    return this.voteService.getVotes(page, limit);
  }

  @UseGuards(MJwtGuard)
  @Post('vote')
  voteVideo(
    @GetUser('id') userId: number,
    @Body() insertVoteDTO: InsertVoteDTO,
  ) {
    return this.voteService.voteVideo(userId, insertVoteDTO);
  }
}
