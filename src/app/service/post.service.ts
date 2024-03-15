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
    const url = `${environment.apiUrl}/posts`;
    return this.http.post<Post>(url, { request });
  }

  getAllPosts(): Observable<Post[]> {
    const url = `${environment.apiUrl}/posts`;
    return this.http.get<Post[]>(url);
  }

  getPostById(postId: number, likedPost: boolean = false): Observable<Post> {
    const url = `${environment.apiUrl}/posts/${postId}/${likedPost}`;
    return this.http.get<Post>(url);
  }

  likePost(postId: number): Observable<string[]> {
    const url = `${environment.apiUrl}/posts/${postId}/like`;
    return this.http.put<string[]>(url, {});
  }

  searchPostByName(name: string): Observable<Post[]> {
    const url = `${environment.apiUrl}/posts/search/${name}`;
    return this.http.get<Post[]>(url);
  }
}
