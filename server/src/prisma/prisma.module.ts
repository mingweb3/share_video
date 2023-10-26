import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// PrismaModule to Connect DB via Using PrismaService
// *Export and Global() - can call everywhere
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // *Export for using in Other Modules
})
export class PrismaModule {}
