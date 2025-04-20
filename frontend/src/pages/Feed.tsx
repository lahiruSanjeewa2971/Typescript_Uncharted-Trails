import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import { PostType } from "@/types/post";
import { toast } from "sonner";
import { postService } from "@/services/postService";
import CommonSkeleton from "@/components/CommonSkeletonLoader";
import { SinglePostCard } from "./SinglePostCard";

const Feed = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postListLoading, setPostListLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostsForFeed = async () => {
      try {
        const postList = await postService.getAllPostForFeed();
        setPosts(postList.data);
        setPostListLoading(false);
      } catch (error: any) {
        toast.error("Failed to fetch posts.");
        console.log("Error in fetch post :", error);
        setPostListLoading(false);
      }
    };
    setPostListLoading(true);
    fetchPostsForFeed();
  }, []);

  return (
    <div className="bg-background w-full">
      {/* HeroSection */}
      <HeroSection />

      <div className="w-5/6 mx-auto flex">
        {/* Left section */}
        <div className="md:w-2/3 w-full">
          <div className="space-y-6 p-4">
            {/* Feed */}
            {postListLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div className="p-4 border rounded-md" key={idx}>
                    <CommonSkeleton className="h-6 w-1/2 mb-4" />
                    <CommonSkeleton className="h-4 w-full mb-2" />
                    <CommonSkeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {Array.isArray(posts) &&
                  posts.map((post) => (
                    <div key={post._id}>
                      <SinglePostCard post={post} />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="w-1/3 md:flex hidden p-4">Right</div>
      </div>
    </div>
  );
};

export default Feed;
