import { FeedItemInterface } from './feed-item.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FeedItemCreateDto implements Partial<FeedItemInterface> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
