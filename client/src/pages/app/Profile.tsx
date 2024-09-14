import { followUser, getUserProfile, ProfileType } from "@/apis/user/user.api";
import FollowButton from "@/components/FollowButton";
import ProfileLoader from "@/components/loaders/ProfileLoader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthProvider";
import { formatNumber } from "@/lib/formatNumber";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { toast } from "sonner";

type LoaderType = {
  data: Promise<ProfileType>;
};
export const loader: LoaderFunction = ({ params }) => {
  const { username } = params;
  const dataPromise = getUserProfile(username as string);
  return defer({ data: dataPromise });
};
const Profile = () => {
  const auth = useAuthContext();
  const { data } = useLoaderData() as LoaderType;
  const [loading, setLoading] = useState<string[]>([]);
  return (
    <section className="px-2 md:px-5">
      <Suspense fallback={<ProfileLoader />}>
        <Await resolve={data}>
          {(data: ProfileType) => {
            const [profile, setProfile] = useState(data);
            useEffect(() => {
              setProfile(data);
            }, [data]);
            const handleFollow = async (id: string) => {
              try {
                setLoading((prev) => [...prev, "follow"]);
                const res = await followUser(id);
                setProfile((prev: any) => ({
                  ...prev,
                  user: { ...prev.user, followers: res },
                }));
              } catch (error) {
                toast.error("Opps! No internet connection", {
                  action: {
                    label: "x",
                    onClick: () => null,
                  },
                });
              } finally {
                setLoading((prev) => prev.filter((item) => item !== "follow"));
              }
            };
            return (
              <>
                <div className="w-fll h-full max-h-20 ">
                  <img
                    src={profile.user.profileImage}
                    alt=""
                    className="w-full object-cover object-center h-full blur-xl opacity-25"
                  />
                </div>
                <div className="flex gap-6 -mt-10 max-sm:flex-col max-sm:items-center max-sm:text-center">
                  <img
                    src={profile.user.profileImage}
                    alt=""
                    className="size-24 rounded-full max-md:size-20 max-sm:size-16"
                  />
                  <div>
                    <h1 className="text-3xl uppercase font-bold max-md:text-xl">
                      {profile.user.status} {profile.user.fullName}
                    </h1>
                    <p className="text-sm opacity-70">
                      @{profile.user.userName} •{" "}
                      {formatNumber(profile.user.followers.length)} followers •{" "}
                      {formatNumber(profile.user.following.length)} following •{" "}
                      {formatNumber(profile.postsCount)} Posts
                    </p>
                    <p className="text-sm opacity-70 mb-4">
                      From {profile.user.school}
                    </p>
                    <FollowButton
                      followers={profile.user.followers}
                      handleFollow={handleFollow}
                      loading={loading}
                      myId={auth?.user?._id as string}
                      userId={profile.user._id as string}
                      className="w-2/5"
                    />
                    {auth?.user?._id.toString() ===
                      profile.user._id.toString() && (
                      <Button variant="outline" className="rounded-full">
                        Customize Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center mt-7 ">
                  <NavLink
                    end={true}
                    to=""
                    className={({ isActive }) =>
                      !isActive
                        ? `px-5 py-1 border-green-500  hover:text-green-600 transition-all duration-200`
                        : `px-5 py-1 border-green-500 border-b text-green-600 transition-all duration-200 `
                    }
                  >
                    Posts
                  </NavLink>
                  <NavLink
                    to="likes"
                    className={({ isActive }) =>
                      !isActive
                        ? `px-5 py-1 border-green-500  hover:text-green-600 transition-all duration-200`
                        : `px-5 py-1 border-green-500 border-b text-green-600 transition-all duration-200 `
                    }
                  >
                    Likes
                  </NavLink>
                </div>
                <Separator />
              </>
            );
          }}
        </Await>
      </Suspense>
      <Outlet />
    </section>
  );
};

export default Profile;
