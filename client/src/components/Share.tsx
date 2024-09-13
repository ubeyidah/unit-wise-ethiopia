import { CiShare2 } from "react-icons/ci";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { LuCopyCheck } from "react-icons/lu";

export const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const Share = () => {
  const [url] = useState(location.href);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleCopy = async () => {
    try {
      setIsAnimate(true);
      await navigator.clipboard.writeText(url);
      await sleep(1000);
      setIsAnimate(false);
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <CiShare2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Only logged-in users will be able to view this link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            {isAnimate ? (
              <LuCopyCheck className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Share;
