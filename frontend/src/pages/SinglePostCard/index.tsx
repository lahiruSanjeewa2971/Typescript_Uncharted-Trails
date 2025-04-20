import { PostType } from "@/types/post";

type SinglePostCardProps = {
  post: PostType; // Adjust this to match your type
};

export const SinglePostCard: React.FC<SinglePostCardProps> = ({ post }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.description}</p>
      {/* You can map images or location here too */}
    </div>
  );
};
