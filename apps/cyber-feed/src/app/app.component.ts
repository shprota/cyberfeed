import { Component } from '@angular/core';
import { AppService } from './app.service';
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
  isFocused = false;
  postForm = this.fb.group({
    content: [null, {
      validators: Validators.required,
      updateOn: 'submit'
    }],
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
    this.isFocused = false;
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
        });
    }
  }

  like(item: FeedItemInterface) {
    this.service.like(item);
  }

  onCancel() {
    this.isFocused = false;
    this.postForm.reset();
  }

  updateFocusState(event: FocusEvent, state: boolean) {
    if (event.relatedTarget) {
      console.log(((event.relatedTarget || {}) as Element).classList.contains('btn'));
    }
    if (!state && event.relatedTarget && (event.relatedTarget as Element).classList.contains('btn')) {
      return;
    }
    this.isFocused = state;
  }
}
