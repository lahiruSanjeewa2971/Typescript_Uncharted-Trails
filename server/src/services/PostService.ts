/**
|--------------------------------------------------
| This handles business logic
|--------------------------------------------------
*/

import { postRepository } from "../repositories/PostRepository";

interface CreatePostInput {
  title: string;
  description: string;
  images: string[];
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const postService = {
  create: async (data: CreatePostInput) => {
    if (!data.title || !data.description || !data.images?.length) {
      throw new Error(
        "Title, description, and at least one image are required."
      );
    }
    return await postRepository.create(data);
  },
  getAll: async () => {
    return await postRepository.getAll();
  },
  getSinglePostData: async (postId: string) => {
    return await postRepository.getSingle(postId);
  },
};
