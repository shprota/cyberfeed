import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedService } from './feed.service';
import { FeedItemCreateDto } from '@cyberproof/dto';
import { FeedListDto } from '@cyberproof/dto';
import { FeedItem } from './data/feed-item.schema';

@ApiTags('Feed API')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/:page')
  @ApiOperation({
    summary: 'Get the feed page',
  })
  @ApiOkResponse({
    type: FeedListDto,
    description: 'List of feed items',
  })
  @ApiBadRequestResponse()
  getFeed(@Param('page') page: number) {
    return this.feedService.list(page);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create a new feed entry',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FeedItem,
    description: 'OK',
  })
  sendSms(@Body() feedItemCreateDto: FeedItemCreateDto) {
    return this.feedService.create(feedItemCreateDto);
  }

  @Patch('/:itemId')
  @ApiOperation({
    summary: 'Increase the entry "like" counter',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FeedItem,
    description: 'OK',
  })
  like(@Param('itemId') itemId: string) {
    return this.feedService.like(itemId);
  }
}
