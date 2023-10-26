import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MJwtGuard } from 'src/auth/guard';
import { InsertVideoDTO } from './dto';
import { VideoService } from './video.service';
import { PaginationParamsDto } from 'src/sharedDto';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  getVideos(@Query() { page, limit }: PaginationParamsDto) {
    return this.videoService.getVideos(page, limit);
  }

  @UseGuards(MJwtGuard)
  @Post()
  insertVideo(
    @GetUser('id') userId: number,
    @Body() insertVideoDTO: InsertVideoDTO,
  ) {
    return this.videoService.insertVideo(userId, insertVideoDTO);
  }
}
