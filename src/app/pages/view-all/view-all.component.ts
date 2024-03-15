import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../models/post.model';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss',
})
export class ViewAllComponent implements OnInit, OnDestroy {
  public allPosts: Post[] = [];
  public allPostSubscription!: Subscription;
  public loading: boolean = false;
  public formGroup!: FormGroup;
  public postNotFound: boolean = false;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this._buildForm();
    this.onClickSearchByName();
  }

  ngOnDestroy(): void {
    this.allPostSubscription.unsubscribe();
  }

  redirectedPost(postId: number): void {
    this.router.navigate(['/view-post', postId]);
  }

  getAllPosts(isLoading = true): void {
    this.loading = isLoading;
    this.allPostSubscription = this.postService.getAllPosts().subscribe({
      next: (posts: Post[]) => {
        this.allPosts = posts;
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    });
  }

  onClickLikePost(): void {
    this.getAllPosts(false);
  }

  onClickSearchByName(): void {
    this.formGroup
      .get('nameSearch')
      ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((name: string) => {
        if (name) {
          this.searchPost(name);
        } else {
          this.getAllPosts();
        }

      });
  }

  searchPost(name: string): void {
    this.postService.searchPostByName(name).subscribe({
      next: (posts: Post[]) => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 300);
        this.allPosts = posts;

        this.postNotFound = posts.length ? false : true;
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
    });
  }

  private _buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nameSearch: [null],
    });
  }
}
