// import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import FormattedDataTime from "@/components/FormattedDataTime";
import ActionDropdown from "@/components/ActionDropdown";
 
const Card = ({ file }) => {
    return (
        <Link href={file.fileUrl} download={true} target="_blank" className="file-card w-[250px]">
            <div className="flex justify-between">
                <Thumbnail
                    type={file.fileType}
                    extension={file.fileExtension}
                    url={file.fileUrl}
                    className="!size-20"
                    imageClassName="!size-11"
                />

                <div className="flex flex-col items-end justify-between bg-white ">
                    <ActionDropdown file={file} />
                </div>
            </div>

            <div className="file-card-details">
                <p className="subtitle-2 line-clamp-1">{file.fileName}</p>
                <FormattedDataTime
                    date={file.createdAt}
                    className="body-2 text-light-100"
                />
                <p className="caption line-clamp-1 text-light-200">
                    By: {file.ownerId.firstName + " " + file.ownerId.lastName  }
                </p>
            </div>
        </Link>
    );
};
export default Card;
