import { Post } from "./post.model";

export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  postedBy: string;
  post: Post;
}
