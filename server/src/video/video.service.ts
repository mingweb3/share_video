import { Injectable } from '@nestjs/common';
import { InsertVideoDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prismaService: PrismaService) {}

  async getVideos(page = 1, limit = 4) {
    const offset = (page - 1) * limit;
    console.log(offset);
    const [count, items] = await this.prismaService.$transaction([
      this.prismaService.video.count(),
      this.prismaService.video.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              hashedPassword: false,
              name: true,
            },
          }, // All fields of a user - except 'hashedPassword'
        },
        orderBy: {
          id: 'desc',
        },
        take: Number(limit),
        skip: offset,
      }),
    ]);

    return {
      pages: Math.ceil(count / limit),
      items,
    };
  }

  async insertVideo(userId: number, inserVideoDTO: InsertVideoDTO) {
    const video = await this.prismaService.video.create({
      data: {
        ...inserVideoDTO,
        userId: userId,
      },
    });
    return video;
  }
}
