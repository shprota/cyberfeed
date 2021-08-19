import { ApiProperty } from '@nestjs/swagger';

export class FeedItemDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  created: Date;
  @ApiProperty()
  likes: number;

}

export class FeedListDto {
  @ApiProperty({type: [FeedItemDto]})
  docs: FeedItemDto[];
  totalDocs: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  page?: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  nextPage?: number;
  @ApiProperty()
  prevPage?: number;
  @ApiProperty()
  pagingCounter: number;
  @ApiProperty()
  hasPrevPage: boolean;
  @ApiProperty()
  hasNextPage: boolean;
}
