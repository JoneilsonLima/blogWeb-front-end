import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss',
})
export class ViewAllComponent implements OnInit, OnDestroy {
  public allPosts: Post[] = [];
  public allPostSubscription!: Subscription;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  ngOnDestroy(): void {
    this.allPostSubscription.unsubscribe();
  }

  getAllPosts(): void {
    this.allPostSubscription = this.postService.getAllPosts().subscribe({
      next: (posts: Post[]) => {
        this.allPosts = posts;
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
    });
  }
}
