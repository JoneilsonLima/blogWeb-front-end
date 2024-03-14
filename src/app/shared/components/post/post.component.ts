import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() public post!: Post;
  @Input() public viewPost: boolean = false;
  @Output() public postId: EventEmitter<number> = new EventEmitter();
  @Output() public liked: EventEmitter<void> = new EventEmitter();

  constructor(private service: PostService, private snackBar: MatSnackBar) {

  }

  onCLickViewPost(): void {
    this.postId.emit(this.post.id);
  }

  onClickLikePost(): void {
    if (!this.post.id) return;

    this.service.likePost(this.post.id).subscribe({
      next: (resp) => {
        this.liked.emit()
        this.snackBar.open(resp[0], 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
    })
  }
}
