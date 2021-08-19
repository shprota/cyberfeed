import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FeedItemInterface } from '@cyberproof/dto';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({versionKey: false})
export class FeedItem implements FeedItemInterface {
  @Prop()
  content: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  created: Date;
  @Prop({default: 0})
  likes: number;
}

export type FeedItemDocument = FeedItem & Document;

export const FeedItemSchema = SchemaFactory.createForClass(FeedItem);
FeedItemSchema.plugin(mongoosePaginate);
