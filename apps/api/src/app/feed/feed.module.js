import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedItem, FeedItemSchema } from './data/feed-item.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: FeedItem.name, schema: FeedItemSchema }])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
