import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedItemCreateDto } from './feed-item-create.dto';
import { FeedItemInterface } from '@cyberproof/dto';

@Component({
  selector: 'cyberproof-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cyber-feed';
  busy = false;
  postForm = this.fb.group({
    content: [null, Validators.required],
  });
  constructor(
    public readonly service: AppService,
    private readonly fb: FormBuilder,
  ) {
    service.loadPage();
  }

  loadNext() {
    this.service.loadPage();
  }

  submitEntry() {
    if (this.postForm.valid) {
      const data: FeedItemCreateDto = {
        content: this.postForm.value.content,
      }
      this.busy = true;
      this.service.submitEntry(data)
        .subscribe(() => {
          this.postForm.reset();
          this.postForm.controls.content.setErrors(null);
          this.busy = false;
          // this.service.reload();
        });
    }
  }

  like(item: FeedItemInterface) {
    this.service.like(item);
  }
}
