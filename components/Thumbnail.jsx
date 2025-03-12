import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";



export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-9 object-contain ",
          imageClassName,
          isImage && "thumbnail-image rounded-md w-4",
        )}
      />
    </figure>
  );
};
export default Thumbnail;