import api from "../api/apiClient";

export interface PostAuthor {
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;    
  imageId: string;       
  author: PostAuthor;
}

export interface PostsResponse {
  count: number;
  posts: Post[];
}

interface GetPostsParams {
  page?: number;
  limit?: number;
}

export async function getPostsService(
  params: GetPostsParams = {}
): Promise<PostsResponse> {
  const response = await api.get<PostsResponse>("/posts", {
    params,
  });

  return response.data;
}