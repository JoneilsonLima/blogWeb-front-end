import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../models/post.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  ngOnDestroy(): void {
    this.allPostSubscription.unsubscribe();
  }

  redirectedPost(postId: number): void {
    this.router.navigate(['/view-post', postId]);
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
