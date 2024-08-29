import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

type Path = "payment" | "profile";
interface hookReturnType {
  progress: number;
  url: string | null;
  uploadImage: (image: File, path: Path) => void;
}

const useUploadImage = (): hookReturnType => {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);

  const uploadImage = async (image: File, path: Path) => {
    if (!image) return;
    const storageRef = ref(storage, `${path}/${image.name + nanoid()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        toast.error("Unable to upload check your internet connection", {
          description: error.message,
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
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  return {
    progress,
    url,
    uploadImage,
  };
};

export default useUploadImage;
