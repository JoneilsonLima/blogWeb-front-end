import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: Post;
}
