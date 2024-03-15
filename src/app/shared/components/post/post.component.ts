import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentRequest } from '../../../models/comment-request.model';
import { CommentService } from '../../../service/comment.service';
import { CommentResponse } from '../../../models/comment-response.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() public post!: Post;
  @Input() public viewPost: boolean = false;
  @Output() public postId: EventEmitter<number> = new EventEmitter();
  @Output() public liked: EventEmitter<void> = new EventEmitter();

  public formGroup!: FormGroup;
  public comments: CommentResponse[] = [];

  constructor(
    private service: PostService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this._buildForm();
    this.getComments();
  }

  onCLickViewPost(): void {
    this.postId.emit(this.post.id);
  }

  onClickLikePost(): void {
    if (!this.post.id) return;

    this.service.likePost(this.post.id).subscribe({
      next: (resp) => {
        this.liked.emit();
        this.snackBar.open(resp[0], 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
    });
  }

  buildRequestComment():  CommentRequest {
    const {
      content,
      postedBy
    } = this.formGroup.getRawValue()

    const request = {
      content: content,
      postedBy: postedBy,
      postId: this.post.id
    } as CommentRequest;

    return request
  }

  publishComment(): void {
    const request = this.buildRequestComment();

    this.commentService.createComment(request).subscribe({
      next: (resp) => {
        this.liked.emit();
        this.snackBar.open('Comentário publicado com sucesso', 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
      complete: () => {
        this.getComments();
      }
    });
  }

  getComments(): void{
    if (!this.post.id) return;

    this.commentService.getCommentById(this.post.id).subscribe({
      next: (resp: CommentResponse[]) => {
        this.comments = resp;
      },
      error: (err) => {
        this.snackBar.open('Algo deu errado!!!', 'Ok');
      },
    });
  }

  private _buildForm(): void {
    this.formGroup = this.formBuilder.group({
      content: [null, [Validators.required]],
      postedBy: [null, [Validators.required]],
    });
  }
}
