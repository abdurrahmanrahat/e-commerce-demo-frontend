"use client";

import { updateUserInDB } from "@/app/actions/users";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import MYTextArea from "@/components/shared/Forms/MYTextArea";
import MyImage from "@/components/shared/Ui/Image/MyImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cloudinaryFolderKey } from "@/constants/authKey";
import { TUser } from "@/types";
import { ImageUp, Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userProfileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11).optional(),
  email: z.string().min(1),
  fullAddress: z.string().optional(),
  country: z.string().optional(),
});

const EditProfileModal = ({ userInfo }: { userInfo: TUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(userInfo.photoUrl || null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleUpdateUserInfo = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      // if (!image) {
      //   toast.error("Please upload an image for the category.");
      // }

      const updatedData = {
        ...(image && { photoUrl: image }),
        ...values,
      };

      const res = await updateUserInDB(userInfo._id, updatedData);

      if (res?.success) {
        toast.success("Information updated successfully!");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
      setIsOpen((prev) => !prev);
    }
  };

  // handle image upload
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    setIsImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", cloudinaryFolderKey);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKED_URL}/upload/image`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        const imageUrl = data.data.url; // cloudinary url

        setImage(imageUrl);

        toast.success("Image uploaded successfully!");
      }
    } catch (error: any) {
      console.log("error full", error);
      toast.error(error?.message || "Image upload failed.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const userDefaultValues = {
    name: userInfo.name || "",
    phone: userInfo.phone || "",
    email: userInfo.email || "",
    fullAddress: userInfo.fullAddress || "",
    country: userInfo.country || "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="h-8 2xl:h-9 hover:bg-muted w-full px-3"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-3xl!">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Your Profile
          </DialogTitle>
        </DialogHeader>

        <MYForm
          onSubmit={handleUpdateUserInfo}
          schema={userProfileSchema}
          defaultValues={userDefaultValues}
        >
          <div className="space-y-5">
            {/* image */}
            <div className="grid gap-[6px]">
              <label
                htmlFor="name"
                className="text-sm 2xl:text-base font-medium text-gray-700 dark:text-gray-300"
              >
                Your Image
              </label>

              <div>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {!image ? (
                  <div className="py-[22px] px-4 rounded-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-200 ease-in-out bg-light-gray dark:bg-deep-dark hover:border-primary cursor-pointer">
                    <label
                      htmlFor="photo"
                      className="block text-center cursor-pointer"
                    >
                      <ImageUp
                        className={`text-4xl ${
                          isImageUploading
                            ? "text-primary animate-pulse"
                            : "text-gray-400"
                        } mb-2 mx-auto`}
                      />
                      <p className="text-sm 2xl:text-base text-gray-900 dark:text-white">
                        {isImageUploading
                          ? "Uploading..."
                          : "Click to upload image"}
                      </p>
                      <p className="text-xs 2xl:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        PNG, JPG up to 2MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative w-40 h-32 mx-auto group rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <MyImage
                      src={image}
                      alt="category-image"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-1 right-1 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200  cursor-pointer w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-500"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
              {/* Full Name */}
              <div className="grid gap-1">
                <label className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <MYInput
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="grid gap-1">
                <label className="text-sm font-medium">Email</label>

                <MYInput
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  readOnly={true}
                />
              </div>

              {/* Phone */}
              <div className="grid gap-1">
                <label className="text-sm font-medium">Phone Number</label>

                <MYInput
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                />
              </div>
              {/* Country */}
              <div className="grid gap-1">
                <label className="text-sm font-medium">Country</label>

                <MYInput name="country" type="text" placeholder="Country" />
              </div>
            </div>

            {/* Address */}
            <div className="grid gap-1">
              <label className="text-sm font-medium">Full Address</label>

              <MYTextArea name="fullAddress" placeholder="Enter full address" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline" className="w-auto">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                className="bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin [animation-duration:1.4s]" />
                    <span>Updating...</span>
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </MYForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
