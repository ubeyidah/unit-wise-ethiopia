import CustemizeProfile from "@/components/info/CustemizeProfile";
import Payment from "@/components/Payment";
import { useAuthContext, User } from "@/context/AuthProvider";
import { useState } from "react";

const MoreInfo = () => {
  const auth = useAuthContext();
  const user = auth?.user;
  const [userProfile, setUserProfile] = useState<Partial<User>>({
    _id: user?._id,
    userName: user?.userName,
    fullName: user?.fullName,
    email: user?.email,
    profileImage: user?.profileImage,
    studyType: user?.studyType,
    gender: user?.gender,
    school: user?.school,
    followers: user?.followers,
    following: user?.following,
    phoneNumber: user?.phoneNumber,
    paymentImage: user?.paymentImage,
    status: user?.status,
  });
  const [section, setSection] = useState("profile");

  return (
    <section className="container px-4 min-h-screen flex items-center justify-center">
      {section == "profile" ? (
        <CustemizeProfile
          profile={userProfile}
          setProfile={setUserProfile}
          setSection={setSection}
        />
      ) : (
        <Payment
          profile={userProfile}
          setProfile={setUserProfile}
          setSection={setSection}
        />
      )}
    </section>
  );
};

export default MoreInfo;
