import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Post } from '../../models/post.model';
import { PostService } from '../../service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit, OnDestroy {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public formGroup!: FormGroup;
  public tags: string[] = [];
  public postSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private service: PostService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear()
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  montarRequestCadastro(): Post {
    const {
      name,
      content,
      img,
      postedBy
    } = this.formGroup.getRawValue();

    const request = {
      name: name,
      content: content,
      img: img,
      postedBy: postedBy,
      tags: this.tags
    } as Post;

    return request;
  }

  onSubmit(): void {
    const request = this.montarRequestCadastro();
    this.postSubscription = this.service.createNewpost(request).subscribe({
      next: () => {
        this.snackBar.open('Post criado com sucesso', 'Fechar', {
          duration: 2000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Fechar', {
          duration: 2000,
        });
      }
    })
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, [Validators.required]],
      postedBy: [null, [Validators.required]]
    });
  }
}
