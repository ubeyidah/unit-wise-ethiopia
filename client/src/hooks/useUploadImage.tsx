import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

type Path = "payment" | "profile" | "postImages";
interface hookReturnType {
  progress: number;
  url: string | null;
  uploadImage: (image: File, path: Path) => void;
  uploadAsyncImage: (image: File, path: Path) => Promise<string>;
}

const useUploadImage = (): hookReturnType => {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);

  const uploadImage = async (image: File, path: Path) => {
    if (!image) return;
    toast.info("Upload starting...", {
      action: {
        label: <IoClose className="size-5" />,
        onClick: () => null,
      },
    });
    const storageRef = ref(storage, `${path}/${image.name + nanoid()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      () => {
        setProgress(0);
        toast.error("Unable to upload", {
          description: "Please check your internet connection and try agin",
          action: {
            label: <IoClose className="size-5" />,
            onClick: () => null,
          },
        });
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(imageUrl);
          setProgress(0);
          toast.success("Uploaded successfully.", {
            action: {
              label: <IoClose className="size-5" />,
              onClick: () => null,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const uploadAsyncImage = async (file: File): Promise<string> => {
    return new Promise((res, rej) => {
      const storageRef = ref(storage, `postImg/${file.name + nanoid()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          rej(error);
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            res(imageUrl);
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  };

  return {
    progress,
    url,
    uploadImage,
    uploadAsyncImage,
  };
};

export default useUploadImage;
