import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedItemCreateDto } from './feed-item-create.dto';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';
import { FeedItemInterface, FeedListDto } from '@cyberproof/dto';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

type FeedList = List<FeedItemInterface>;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private feedSubject: BehaviorSubject<FeedList> = new BehaviorSubject<FeedList>(List([]));
  feed$ = this.feedSubject.asObservable();
  hasNextPage = false;
  currentPage = 1;

  constructor(private readonly http: HttpClient) {}

  private static mapItem(item: FeedItemInterface) {
    return {...item, created: new Date(item.created)};
  }

  loadPage() {
    this.http.get<FeedListDto>(`${environment.apiBaseUrl}/feed/${this.currentPage++}`)
      .subscribe(res => {
        console.log(res);
        this.feedSubject.next(this.feedSubject.getValue()
          .concat(
            res['docs'].map(AppService.mapItem)
          )
        );
        this.hasNextPage = res.hasNextPage;
      });
  }

  reload() {
    this.feedSubject.next(List([]));
    this.currentPage = 1;
    this.loadPage();
  }

  submitEntry(data: FeedItemCreateDto) {
    return this.http.post<FeedItemInterface>(`${environment.apiBaseUrl}/feed`, data)
      .pipe(
        tap((item) => {
          const currentList = this.feedSubject.getValue();
          this.feedSubject.next(currentList.unshift(AppService.mapItem(item)));
        })
      );
  }

  like(item: FeedItemInterface) {
    return this.http.patch<FeedItemInterface>(`${environment.apiBaseUrl}/feed/${item._id}`, null)
      .subscribe(res => {
        const feed = this.feedSubject.getValue();
        const idx = feed.findIndex((item) => item._id === res._id);
        this.feedSubject.next(feed.set(idx, AppService.mapItem(res)));
      });
  }
}
