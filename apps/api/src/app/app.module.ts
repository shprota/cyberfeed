import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoUrl, {useFindAndModify: false}),
    FeedModule,
  ],
})
export class AppModule {}
