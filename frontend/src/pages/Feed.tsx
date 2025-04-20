import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import { PostType } from "@/types/post";
import { toast } from "sonner";
import { postService } from "@/services/postService";

const Feed = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postListLoading, setPostListLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPostsForFeed = async () => {
      try {
        const postList = await postService.getAllPostForFeed();
        console.log("Post list :", postList);
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
              <></>
            ) : (
              <>
                {Array.from({ length: 20 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800 text-white p-4 rounded-xl"
                  >
                    Scrollable Content {idx + 1}
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
