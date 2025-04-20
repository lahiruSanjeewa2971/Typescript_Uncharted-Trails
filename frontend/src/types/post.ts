export type CommentType = {
  _id: string;
  userId: string;
  text: string;
  createAt: string;
};

export type LocationType = {
  latitude: number;
  longtitude: number;
};

export type PostType = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  userId: string;
  likes: string[];
  location: LocationType;
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};
