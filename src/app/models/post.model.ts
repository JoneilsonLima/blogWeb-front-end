export interface Post {
  name: string;
  id?: number,
  content: string;
  img: string;
  postedBy: string;
  date?: string;
  likeCount?: number;
  viewCount?: number;
  tags: string[];
}
