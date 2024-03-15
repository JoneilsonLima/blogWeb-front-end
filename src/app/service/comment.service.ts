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
    let url = `${environment.apiUrl}/comments/create`;

    let params = new HttpParams();
    params = params.append('postId', commentRequest.postId);
    params = params.append('postedBy', commentRequest.postedBy);

    return this.http.post<void>(url, commentRequest.content, { params });
  }
}
