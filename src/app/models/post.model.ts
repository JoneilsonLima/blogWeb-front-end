export interface Post {
  name: string;
  content: string;
  img: string;
  postedBy: string;
  date?: string;
  likeCount?: number;
  viewCount?: number;
  tags: string[];
}
