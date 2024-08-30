import { pricing, sources, paymentInfo as payment } from "@/data/landing";
import { FaMoneyCheck } from "react-icons/fa";
import { BsCloudUpload } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import { ProfileType } from "@/pages/MoreInfo";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUploadImage from "@/hooks/useUploadImage";
import AccountSwitcher from "./AccountSwitcher";
import { takeInfoToServer } from "@/apis/user/user.api";
import { useAuthContext } from "@/context/AuthProvider";

type PaymentErrorType = {
  paymentImage: string;
  source: string;
  isAccept: string;
};

const Payment = ({
  profile,
  setProfile,
  setSection,
}: {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [canValidate, setcanValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PaymentErrorType>({
    paymentImage: "",
    source: "",
    isAccept: "",
  });

  let { progress, url, uploadImage } = useUploadImage();
  const auth = useAuthContext();

  const validateForm = () => {
    let hasError = false;
    if (!profile.paymentImage) {
      setError((prev) => ({
        ...prev,
        paymentImage: "Please upload your Payment confirmation screenshot",
      }));
      hasError = true;
    } else {
      setError((prev) => ({
        ...prev,
        paymentImage: "",
      }));
    }
    if (!profile.source || profile.source == "") {
      setError((prev) => ({
        ...prev,
        source: "Please tell us where did you hear about us",
      }));
      hasError = true;
    } else {
      setError((prev) => ({
        ...prev,
        source: "",
      }));
    }
    if (!profile.isAccept) {
      setError((prev) => ({
        ...prev,
        isAccept: "Accept terms and conditions",
      }));
      hasError = true;
    } else {
      setError((prev) => ({
        ...prev,
        isAccept: "",
      }));
    }
    return hasError;
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    e.target.disabled = true;
    const image = e.target.files[0];
    if (!image) return;
    uploadImage(image, "payment");
    e.target.disabled = false;
  };
  useEffect(() => {
    if (url) {
      setProfile((prev) => ({ ...prev, paymentImage: url || "" }));
    }
  }, [url]);
  useEffect(() => {
    if (canValidate) {
      validateForm();
    }
  }, [profile]);

  const finishPayment = async () => {
    try {
      setcanValidate(true);
      if (progress)
        return toast.info("Please give a time to complete the upload.", {
          action: {
            label: <IoClose className="size-5" />,
            onClick: () => null,
          },
        });
      const hasError = validateForm();
      if (hasError) {
        toast.error("Please enter a valid information", {
          description: "Provide us with correct information to complete",
          action: {
            label: <IoClose className="size-5" />,
            onClick: () => null,
          },
        });
        return;
      }
      if (auth?.login) {
        setLoading(true);
        await takeInfoToServer(profile, auth?.login);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const imageRemover = () => {
    setProfile((prev) => ({ ...prev, paymentImage: "" }));
    url = "";
  };

  return (
    <div className="w-full p-3 md:p-6 dark:bg-slate-500/5 rounded-2xl border max-w-5xl py-20 max-md:py-10 my-20 bg-slate-200/20 relative">
      <div className="absolute top-3 right-4">
        <AccountSwitcher />
      </div>
      <div className="flex items-center gap-5 mb-8">
        <div className=" p-3 box-content bg-green-300/10 rounded-full ">
          <FaMoneyCheck className="size-8 max-sm:size-5 text-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl max-md:text-center max-sm:text-lg">
          <span className="text-green-400 ">Complete</span> Your Payment
        </h1>
      </div>
      <div className="flex flex-col w-full md:flex-row max-md:flex-col-reverse">
        <div className="md:w-2/5 md:p-4 w-full">
          <div>
            <h4 className="text-lg font-semibold max-sm:text-sm text-green-400 mb-2">
              Upload Your Payment Confirmation
            </h4>
            {!profile.paymentImage ? (
              <UploadTemplate error={error} progress={progress} />
            ) : (
              <div className="aspect-video relative">
                <img
                  src={profile.paymentImage || ""}
                  alt="payment confirm screenshot "
                  className="size-full rounded-md object-cover object-center"
                />

                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <button
                        className="absolute top-2 right-2 bg-slate-700/90 p-1 rounded-full border hover:bg-slate-700/80"
                        onClick={imageRemover}
                      >
                        <IoClose className="size-5 text-white" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>remove</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            {error.paymentImage ? (
              <p className="text-red-600 text-sm mt-2">{error.paymentImage}</p>
            ) : (
              <p className="text-xs mt-3 dark:text-slate-300">
                please upload your payment confirmation screenshot or receipt
                below. This is required to verify your payment.
              </p>
            )}
            <input
              type="file"
              id="screenshot"
              accept="image/*"
              onChange={handleImage}
              disabled={!!profile.paymentImage}
              className="disable:opacity-40"
              hidden
            />
          </div>
          <div className="my-6">
            <h3
              className={`text-sm mb-1 ${!!error.source ? "text-red-600" : ""}`}
            >
              Where did you hear about us?
            </h3>
            <Select
              name="source"
              onValueChange={(source) =>
                setProfile((prev) => ({ ...prev, source }))
              }
              defaultValue={profile.source}
            >
              <SelectTrigger className={!!error.source ? "border-red-500" : ""}>
                <SelectValue placeholder="tell us where did you hear about us" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source.value} value={source.value}>
                    {source.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="md:w-3/5 w-full md:p-4">
          <h2 className="text-lg font-semibold mb-1">Payment Options</h2>
          <p className="text-sm mb-4 dark:text-slate-200 text-slate-800">
            You can pay using either Mobile Banking or by visiting the actual
            bank.
          </p>

          <div className="mb-4 py-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="option-1">
                <AccordionTrigger>
                  <h3 className="text-lg font-semibold text-green-600">
                    1. Mobile Banking
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc marker:text-green-600 ml-4">
                    <li>
                      Open your mobile banking app{" "}
                      <span className="text-sm">
                        (Commercial Bank of Ethiopia NEGB Bank)
                      </span>
                      .
                    </li>
                    <li>Use the following details to make the payment</li>
                    <ul className="list-disc marker:text-green-600 ml-7 my-2">
                      <li>
                        Bank Account Number:{" "}
                        <span className=" border-green-500 border-b-2">
                          {payment.accountNumber}
                        </span>
                      </li>
                      <li>
                        Account Name:{" "}
                        <span className=" border-green-500 border-b-2">
                          {payment.accountName}
                        </span>
                      </li>
                      <li>
                        Amount:{" "}
                        <span className=" border-green-500 border-b-2">
                          {pricing.price - pricing.discount}Birr
                        </span>{" "}
                        -
                        <span className="line-through">
                          {pricing.price}Birr
                        </span>
                      </li>
                    </ul>
                    <li>
                      After completing the payment, take a screenshot of the
                      payment confirmation.
                    </li>
                    <li>Proceed to upload the screenshot below.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="option-2">
                <AccordionTrigger>
                  <h3 className="text-lg font-semibold text-green-600">
                    2. Bank Branch (In-Person)
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc marker:text-green-600 ml-4">
                    <li>
                      Visit the nearest Commercial Bank of Ethiopia NEGB Bank
                      branch.
                    </li>
                    <li>Provide the following details to the bank teller</li>
                    <ul className="list-disc marker:text-green-600 ml-7 my-2">
                      <li>
                        Bank Account Number:{" "}
                        <span className=" border-green-500 border-b-2">
                          {payment.accountNumber}
                        </span>
                      </li>
                      <li>
                        Account Name:{" "}
                        <span className=" border-green-500 border-b-2">
                          {payment.accountName}
                        </span>
                      </li>
                      <li>
                        Amount:{" "}
                        <span className=" border-green-500 border-b-2">
                          {pricing.price - pricing.discount}Birr
                        </span>{" "}
                        -
                        <span className="line-through">
                          {pricing.price}Birr
                        </span>
                      </li>
                    </ul>
                    <li>
                      After making the payment, you will receive a payment
                      confirmation receipt.
                    </li>
                    <li>
                      Take a clear photo of the receipt and upload it below.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Checkbox
          id="terms1"
          onCheckedChange={(isAccept) =>
            setProfile((prev) => ({
              ...prev,
              isAccept: Boolean(isAccept),
            }))
          }
          checked={profile.isAccept}
          className={error.isAccept ? "border-red-500" : ""}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <span className={error.isAccept ? "text-red-600" : ""}>
              Accept terms and conditions
            </span>
            <p className="text-sm max-sm:text-xs text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <Button
          variant="secondary"
          onClick={() => {
            if (progress)
              return toast.info("Please give a time to complete the upload.", {
                action: {
                  label: <IoClose className="size-5" />,
                  onClick: () => null,
                },
              });
            setSection("profile");
          }}
        >
          Back
        </Button>
        <Button onClick={finishPayment} disabled={loading}>
          {loading ? "Finishing..." : "Finish"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;

function UploadTemplate({
  error,
  progress,
}: {
  error: PaymentErrorType;
  progress: number;
}) {
  return (
    <label
      htmlFor="screenshot"
      className={`flex justify-center items-center flex-col p-4 border-dashed border rounded-sm bg-green-500/5 text-green-400 aspect-video gap-4 relative ${
        !!error.paymentImage ? "border-red-500/60" : "border-green-500/60"
      }`}
    >
      {progress ? (
        <>
          <AiOutlineLoading className="size-16 animate-spin text-green-400" />
          <span className="text-xl absolute">{progress.toFixed(0)}%</span>
        </>
      ) : (
        <>
          {" "}
          <BsCloudUpload className="size-10" />
          <p className="text-sm text-center">
            Upload Payment Screenshot/Receipt
          </p>
        </>
      )}
    </label>
  );
}
