import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent implements OnInit, OnDestroy {
  public postId!: number;
  public postSubscription!: Subscription;
  public post!: Post;
  public loading: boolean = false;

  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((resp: Params) => {
      this.postId = +resp['id'];
    });
  }

  ngOnInit(): void {
    this.getPostById();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  getPostById(isLoading = true, likedPost?: boolean): void {
    this.loading = isLoading;
    this.postSubscription = this.service.getPostById(this.postId, likedPost).subscribe({
      next: (post: Post) => {
        this.post = post;
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 300)
      }
    });
  }

  onClickLikePost(): void {
    this.getPostById(false, true);
  }
}
