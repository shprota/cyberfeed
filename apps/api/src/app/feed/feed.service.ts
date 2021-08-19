import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedItem, FeedItemDocument } from './data/feed-item.schema';
import 'mongoose-paginate-v2';
import { PaginateModel, PaginateResult } from 'mongoose';
import { FeedItemCreateDto } from '@cyberproof/dto';

@Injectable()
export class FeedService {
  constructor(@InjectModel(FeedItem.name) private feedItemModel: PaginateModel<FeedItemDocument>) {}

  create(createFeedItemDto: FeedItemCreateDto): Promise<FeedItem> {
    const newItem = new this.feedItemModel(createFeedItemDto);
    return newItem.save();
  }

  list(page: number): Promise<PaginateResult<FeedItem>> {
    return this.feedItemModel.paginate({}, {page, limit: 10, sort: {created: -1}});
  }

  like(itemId: string) {
    return this.feedItemModel.findByIdAndUpdate(itemId, {$inc: {likes: 1}}, {new: true}).exec();
  }
}
