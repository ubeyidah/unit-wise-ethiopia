import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import AccountSwitcher from "../AccountSwitcher";
import { useAuthContext } from "@/context/AuthProvider";

type User = {
  gender: string;
  phoneNumber: string;
  school: string;
  status: string;
  studyType: string;
};
const formSchema = z.object({
  gender: z.string().min(3, { message: "select gender" }),
  phoneNumber: z
    .string()
    .min(10, { message: "invalid phone number" })
    .max(12, { message: "invalid phone number" }),
  school: z.string().min(3, { message: "school is required" }),
  status: z.string().min(3, { message: "select your current status" }),
  studyType: z.string().min(3, { message: "select study type" }),
});

const TakeInfo = ({
  profile,
  setProfile,
  setSection,
}: {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: profile?.gender || "",
      phoneNumber: profile?.phoneNumber || "",
      school: profile?.school || "",
      status: profile?.status || "",
      studyType: profile?.studyType || "",
    },
  });
  const auth = useAuthContext();

  const saveToState = ({
    gender,
    phoneNumber,
    school,
    status,
    studyType,
  }: User) => {
    setProfile((prev: any) => ({
      ...prev,
      gender,
      phoneNumber,
      school,
      status,
      studyType,
    }));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    saveToState(data);
    setSection("payment");
  };

  return (
    <div className="w-full p-4 md:p-6 dark:bg-slate-500/5 rounded-2xl border max-w-2xl py-20 max-md:py-10 my-20  bg-slate-200/20 relative">
      <div className="absolute top-6 right-5">
        <AccountSwitcher />
      </div>
      <h1 className="text-md mt-1 md:text-xl mb-8 max-md:text-center max-sm:mt-7">
        Let us finish setting up your{" "}
        <span className="text-green-600">account {auth?.user?.userName}</span>
      </h1>
      <div className="flex flex-col w-full md:flex-row">
        <div className="w-full p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
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
                <Button className="max-md:mt-4 mt-6" size="lg">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TakeInfo;
