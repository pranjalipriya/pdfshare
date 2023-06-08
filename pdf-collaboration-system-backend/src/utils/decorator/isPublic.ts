import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = () => SetMetadata('isPublic', true);