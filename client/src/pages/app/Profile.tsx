import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthProvider";

const Profile = () => {
  const auth = useAuthContext();
  return (
    <section className="px-2 md:px-5">
      <div className="w-fll h-full max-h-20 ">
        <img
          src={auth?.user?.profileImage}
          alt=""
          className="w-full object-cover object-center h-full blur-xl opacity-25"
        />
      </div>
      <div className="flex gap-6 -mt-10">
        <img
          src={auth?.user?.profileImage}
          alt=""
          className="size-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl uppercase font-bold">
            {auth?.user?.status} {auth?.user?.fullName}
          </h1>
          <p className="text-sm opacity-70">
            @{auth?.user?.userName} • 1.06M followers • 631 Posts
          </p>
          <p className="text-sm opacity-70">From {auth?.user?.school}</p>
          <Button variant="outline" className="rounded-full mt-2">
            Follow
          </Button>
        </div>
      </div>

      <div className="flex items-center mt-7 ">
        <button className="text-green-600 px-5 py-1 border-b border-green-500 transition-all duration-200">
          Posts
        </button>
        <button className="px-5 py-1 border-green-500  hover:text-green-600 transition-all duration-200">
          Likes
        </button>
      </div>
      <Separator />
    </section>
  );
};

export default Profile;
