import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() public post!: Post;
  @Output() public postId: EventEmitter<number> = new EventEmitter();

  onCLickViewPost(): void {
    this.postId.emit(this.post.id);
  }
}
