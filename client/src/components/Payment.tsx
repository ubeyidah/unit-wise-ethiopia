import { pricing, sources } from "@/data/landing";
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
import { User } from "@/context/AuthProvider";
import { ChangeEvent, useEffect, useState } from "react";
const Payment = ({
  profile,
  setProfile,
  setSection,
}: {
  profile: Partial<User>;
  setProfile: React.Dispatch<React.SetStateAction<{}>>;
  setSection: any;
}) => {
  const [image, setImage] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    paymentImage: "",
    source: "",
    isAccept: false,
  });
  const [error, setError] = useState({
    paymentImage: "",
    source: "",
    isAccept: "",
  });
  const validateForm = () => {
    let hasError = false;
    if (!paymentInfo.paymentImage) {
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
      hasError = false;
    }
    if (!paymentInfo.source || paymentInfo.source == "") {
      setError((prev) => ({
        ...prev,
        source: "Please tell us where did you hear about us",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        source: "",
      }));
    }
    if (!paymentInfo.isAccept) {
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
    console.log(e.target.files[0]);
  };
  useEffect(() => {
    validateForm();
  }, [paymentInfo]);

  const finishPayment = async () => {
    try {
      const hasError = validateForm();
      console.log(error);
      if (hasError) return;
      console.log(paymentInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-3 md:p-6 dark:bg-slate-500/5 rounded-2xl border max-w-5xl py-20 max-md:py-10 my-20  bg-slate-200/20">
      <div className="flex items-center gap-5 mb-8">
        <div className=" p-3 box-content bg-green-300/10 rounded-full">
          <FaMoneyCheck className="size-8 text-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl max-md:text-center">
          <span className="text-green-400 ">Complete</span> Your Payment
        </h1>
      </div>
      <div className="flex flex-col w-full md:flex-row max-md:flex-col-reverse">
        <div className="md:w-2/5 md:p-4 w-full">
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-2">
              Upload Your Payment Confirmation
            </h4>
            <label
              htmlFor="screenshot"
              className={`flex justify-center items-center flex-col p-4 border-dashed border rounded-sm bg-green-500/5 text-green-400 aspect-video gap-4 ${
                !!error.paymentImage
                  ? "border-red-500/60"
                  : "border-green-500/60"
              }`}
            >
              <BsCloudUpload className="size-10" />
              <p className="text-sm text-center">
                Upload Payment Screenshot/Receipt
              </p>
            </label>
            {error.paymentImage ? (
              <p className="text-red-600 text-sm mt-2">{error.paymentImage}</p>
            ) : (
              <p className="text-xs mt-2 dark:text-slate-300">
                please upload your payment confirmation screenshot or receipt
                below. This is required to verify your payment.
              </p>
            )}
            <input
              type="file"
              id="screenshot"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          </div>
          <div className="my-4">
            <h3
              className={`text-sm mb-1 ${!!error.source ? "text-red-600" : ""}`}
            >
              Where did you hear about us?
            </h3>
            <Select
              name="source"
              onValueChange={(source) =>
                setPaymentInfo((prev) => ({ ...prev, source }))
              }
              defaultValue={paymentInfo.source}
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

          <div className="mb-4">
            <Accordion type="single" collapsible defaultValue="option-1">
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
                          {paymentInfo.accountNumber}
                        </span>
                      </li>
                      <li>
                        Account Name:{" "}
                        <span className=" border-green-500 border-b-2">
                          {paymentInfo.accountName}
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
                          {paymentInfo.accountNumber}
                        </span>
                      </li>
                      <li>
                        Account Name:{" "}
                        <span className=" border-green-500 border-b-2">
                          {paymentInfo.accountName}
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
            setPaymentInfo((prev) => ({
              ...prev,
              isAccept: Boolean(isAccept),
            }))
          }
          checked={paymentInfo.isAccept}
          className={error.isAccept ? "border-red-500" : ""}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <Button variant="secondary" onClick={() => setSection("profile")}>
          Back
        </Button>
        <Button onClick={finishPayment}>Finish</Button>
      </div>
    </div>
  );
};

export default Payment;
