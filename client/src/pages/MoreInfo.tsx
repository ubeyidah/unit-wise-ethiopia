import TakeInfo from "@/components/info/TakeInfo";
import Payment from "@/components/Payment";
import { useAuthContext } from "@/context/AuthProvider";
import { useState } from "react";

export interface ProfileType {
  studyType: string;
  gender: "male" | "female" | "";
  school: string;
  phoneNumber: string;
  status: string;
  isAccept: boolean | undefined;
  source: string | undefined;
}
const MoreInfo = () => {
  const auth = useAuthContext();
  const user = auth?.user;
  const [userProfile, setUserProfile] = useState<ProfileType>({
    studyType: user?.studyType || "",
    gender: user?.gender || "",
    school: user?.school || "",
    phoneNumber: user?.phoneNumber || "",
    status: user?.status || "",
    isAccept: false,
    source: "",
  });

  const [section, setSection] = useState("profile");

  return (
    <section className="container px-4 min-h-screen flex items-center justify-center">
      {section == "profile" ? (
        <TakeInfo
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
