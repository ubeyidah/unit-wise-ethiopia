import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const EmptyPostProfile = ({ isAuthor }: { isAuthor: boolean }) => {
  const message = isAuthor
    ? "Hi there! It looks like you haven’t shared anything yet. Why not create your first post and share your thoughts or ideas with others?"
    : "This user hasn't posted anything yet. Stay tuned for updates or explore other students' posts in the meantime!";
  const imageURI = isAuthor ? "/empty-auth.svg" : "/empty-all.svg";
  return (
    <div className="w-full gap-3 flex items-center justify-center flex-col mt-10">
      <img
        src={imageURI}
        alt="illustrations for empty post"
        className="w-[40%] md:w-[20%] opacity-50"
      />
      <p className="text-center text-sm opacity-70 max-w-md max-sm:max-w-sm">
        {message}
      </p>
      {isAuthor && (
        <Link to="/dashboard/study-hub/write">
          <Button className="rounded-full">Create one</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyPostProfile;
