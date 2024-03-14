import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public formGroup!: FormGroup;
  public tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, [Validators.required]],
      postedBy: [null, [Validators.required]]
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear()
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {

  }
}
