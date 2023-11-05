import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertVideoDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prismaService: PrismaService) {}

  async getVideos(page = 1, limit = 4) {
    const offset = (page - 1) * limit;

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
      currentPage: page,
      items,
    };
  }

  async getVideosIncVotes(page = 1, limit = 4) {
    const offset = (page - 1) * limit;

    const [count, items] = await this.prismaService.$transaction([
      this.prismaService.video.count(),
      this.prismaService.video.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              hashedPassword: false, // All fields of a user - except 'hashedPassword'
              name: true,
            },
          },
          _count: {
            select: {
              votes: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
        take: Number(limit),
        skip: offset,
      }),
    ]);

    // Count votes for each video
    const countedVideos = items.map(async (item) => {
      const countUp = await this.prismaService.vote.count({
        where: { videoId: item.id, value: true },
      });

      return {
        ...item,
        upVote: countUp,
        downVote: item._count.votes - countUp,
      };
    });

    const videoWithVotes = await Promise.all(countedVideos);

    return {
      pages: Math.ceil(count / limit),
      currentPage: page,
      items: videoWithVotes,
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

  async deleteVideoById(videoId: number) {
    const note = await this.prismaService.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!note) {
      throw new ForbiddenException('There is no video!');
    }

    return this.prismaService.video.delete({
      where: {
        id: videoId,
      },
    });
  }
}
