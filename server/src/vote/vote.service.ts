import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertVoteDTO } from './dto/insert.vote.dto';

@Injectable()
export class VoteService {
  constructor(private prismaService: PrismaService) {}

  async getVotes(page = 1, limit = 4) {
    const offset = (page - 1) * limit;

    const [count, items] = await this.prismaService.$transaction([
      this.prismaService.vote.count(),
      this.prismaService.vote.findMany({
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

  async voteVideo(userId: number, inserVoteDTO: InsertVoteDTO) {
    const vote = await this.prismaService.vote.findFirst({
      where: {
        videoId: {
          equals: inserVoteDTO.videoId,
        },
        userId: {
          equals: userId,
        },
      },
    });

    let newVote = vote;
    // 1_ This user already voted this Video
    if (vote !== null && vote.id) {
      newVote = await this.prismaService.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          value: inserVoteDTO.value,
        },
      });
    } else {
      // 2_ New Vote for this Video
      newVote = await this.prismaService.vote.create({
        data: {
          ...inserVoteDTO,
          userId: userId,
        },
      });
    }

    return newVote;
  }
}
