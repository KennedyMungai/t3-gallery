"use client";

import { LoaderIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export const SimpleUploadButton = () => {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("Upload begin"),
        toast(
          <div className="flex gap-x-2">
            <LoaderIcon className="animate-spin" /> Uploading...
          </div>,
          {
            duration: 500000,
            id: "upload-begin",
          },
        );
    },
    onUploadError(error) {
      posthog.capture("Upload Error", { error });
      toast.dismiss("upload-begin");
      toast.error("Upload Failed");
    },
    onClientUploadComplete() {
      router.refresh();
      toast.dismiss("upload-begin");
      toast("Uploaded image successfully");
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadIcon />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
