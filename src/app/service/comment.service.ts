import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { CommentRequest } from '../models/comment-request.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(commentRequest: CommentRequest): Observable<void> {
    const url = `${environment.apiUrl}/comments/create`;

    const params = new HttpParams();
    params.set('postId', commentRequest.postId);
    params.set('postedBy', commentRequest.postedBy);

    return this.http.post<void>(url, commentRequest.content, { params });
  }
}
