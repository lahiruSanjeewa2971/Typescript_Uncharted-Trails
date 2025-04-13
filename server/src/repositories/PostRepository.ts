/**
|--------------------------------------------------
| Handles actual database queries
|--------------------------------------------------
*/

import { PostModel } from "../models/PostModel";

export const postRepository = {
  create: async (data: any) => await PostModel.create(data),
  getAll: async () => await PostModel.find().sort({ createdAt: -1 }),
  getSingle: async (postId: any) => await PostModel.findById(postId),
};
