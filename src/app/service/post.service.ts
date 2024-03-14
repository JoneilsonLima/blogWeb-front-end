import { environment } from './../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewpost(request: Post): Observable<Post> {
    const url = `${environment.apiUrl}/posts`
    return this.http.post<Post>(url, { request })
  }

  getAllPosts(): Observable<Post[]> {
    const url = `${environment.apiUrl}/posts`
    return this.http.get<Post[]>(url)
  }
}
