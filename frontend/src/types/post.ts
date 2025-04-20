export type CommentType = {
  _id: string;
  userId: string;
  text: string;
  createAt: string;
};

export type LocationType = {
  latitude: string;
  longtitude: string;
};

export type PostType = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  userId: string;
  likes: string[];
  location: LocationType[];
  Comments: CommentType[];
  createAt: string;
  updatedAt: string;
};
