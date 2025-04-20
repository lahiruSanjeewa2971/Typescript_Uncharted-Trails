import axiosInstance from "@/api/axiosInstance";
import { PostType } from "@/types/post";

export const postService = {
  getAllPostForFeed: async ():Promise<PostType[]> => {
    try {
      const response = await axiosInstance.get<PostType[]>("/api/posts");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Network error. Please try again.");
    }
  },
};
