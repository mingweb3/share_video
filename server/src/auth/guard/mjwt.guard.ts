import { AuthGuard } from '@nestjs/passport';

export class MJwtGuard extends AuthGuard('jwt') {}
