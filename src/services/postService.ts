import {
  Platform,
} from "react-native";
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

export async function createPostService(
  title: string,
  content: string,
  image: any
) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);

   if (image) {

    if (Platform.OS === "web") {
      const response = await fetch(image.uri);
      const blob = await response.blob();

      const file = new File([blob], "photo.jpg", { type: blob.type });

      formData.append("foto", file);
    } else {
      // Para mobile
      formData.append("foto", {
        uri: image.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);
    }
  }

  const response = await api.post("/posts", formData);

  return response.data;
}

export async function deletePostService(id: number) {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
}


export async function getMyPostsService(): Promise<Post[]> {
  const response = await api.get("/my-posts");
  const data = response.data;
  if (Array.isArray(data)) {
    return data as Post[];
  }

  if (Array.isArray((data as any).posts)) {
    return (data as any).posts as Post[];
  }

  return [];
}