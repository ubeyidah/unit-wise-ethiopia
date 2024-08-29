import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ProfileType } from "@/pages/MoreInfo";
import useUploadImage from "@/hooks/useUploadImage";
import { ChangeEvent, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

type User = {
  userName: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  school: string;
  status: string;
  studyType: string;
};
const formSchema = z.object({
  userName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  fullName: z
    .string()
    .min(3, { message: "your name must be at least 3 characters." }),
  gender: z.string().min(3, { message: "select gender" }),
  phoneNumber: z
    .string()
    .min(10, { message: "invalid phone number" })
    .max(12, { message: "invalid phone number" }),
  school: z.string().min(3, { message: "school is required" }),
  status: z.string().min(3, { message: "select your current status" }),
  studyType: z.string().min(3, { message: "select study type" }),
});

const CustemizeProfile = ({
  profile,
  setProfile,
  setSection,
}: {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { progress, url, uploadImage } = useUploadImage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: profile?.userName || "",
      fullName: profile?.fullName || "",
      gender: profile?.gender || "",
      phoneNumber: profile?.phoneNumber || "",
      school: profile?.school || "",
      status: profile?.status || "",
      studyType: profile?.studyType || "",
    },
  });

  const saveToState = ({
    userName,
    fullName,
    gender,
    phoneNumber,
    school,
    status,
    studyType,
  }: User) => {
    setProfile((prev: any) => ({
      ...prev,
      userName,
      fullName,
      gender,
      phoneNumber,
      school,
      status,
      studyType,
    }));
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    e.target.disabled = true;
    const image = e.target.files[0];
    if (!image) return;
    uploadImage(image, "profile");
    if (url) {
      setProfile((prev) => ({ ...prev, profileImage: url || "" }));
    }
    e.target.disabled = false;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (progress) return;
      saveToState(data);
      setSection("payment");
    } catch (error) {
      return toast.success("somting went wrong. try again later.");
    }
  };
  useEffect(() => {
    if (url) {
      setProfile((prev) => ({ ...prev, profileImage: url || "" }));
    }
  }, [url]);
  return (
    <div className="w-full p-4 md:p-6 dark:bg-slate-500/5 rounded-2xl border max-w-5xl py-20 max-md:py-10 my-20  bg-slate-200/20">
      <h1 className="text-2xl md:text-3xl mb-8 max-md:text-center">
        <span className="text-green-400 ">Custemize</span> your profile
      </h1>
      <div className="flex flex-col w-full md:flex-row">
        {progress ? (
          <div className="md:w-1/3 p-4 w-full md:border-r flex items-start justify-center max-sm:justify-start">
            <div className="flex items-center justify-center rounded-full border border-slate-400 dark:border-slate-600">
              <AiOutlineLoading className="size-20 animate-spin text-green-400" />
              <span className="text-xl absolute">{progress.toFixed(0)}%</span>
            </div>
          </div>
        ) : (
          <div className="md:w-1/3 p-4 w-full md:border-r flex items-start justify-center max-sm:justify-start">
            <label
              htmlFor="profile"
              className="rounded-full border hover:brightness-50 relative w-fit cursor-pointer hover:border-slate-100 profile-editor"
            >
              <img
                src={profile.profileImage || ""}
                alt={profile.userName}
                className="rounded-full size-28 object-cover object-center"
              />
              <MdOutlineEdit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white size-8 z-20 hidden profile-icon" />
            </label>
            <input
              type="file"
              id="profile"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </div>
        )}

        <div className="md:w-2/3 w-full p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="user name" {...field} />
                    </FormControl>
                    <FormDescription>
                      this name will display for everyone
                    </FormDescription>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your name" {...field} />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">male</SelectItem>
                        <SelectItem value="female">female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input placeholder="your school" {...field} />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">student</SelectItem>
                        <SelectItem value="teacher">teacher</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studyType"
                render={({ field }) => (
                  <FormItem className="max-md:mb-5">
                    <FormLabel>Study Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your study" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="natural">natural science</SelectItem>
                        <SelectItem value="social">social science </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <Separator className="md:hidden" />
              <div className="flex items-center justify-end">
                <Button className="max-md:mt-4">Next</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustemizeProfile;
