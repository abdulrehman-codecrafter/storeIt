import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes, digits) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};


export const getFileType = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "zip",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { fileType: "document" };
  if (imageExtensions.includes(extension)) return { fileType: "image" };
  if (videoExtensions.includes(extension)) return { fileType: "media" };
  if (audioExtensions.includes(extension)) return { fileType: "media" };

  return { fileType: "other" };
};

export const formatDateTime = (isoString) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
  extension,
  type,
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "zip":
      return "/assets/icons/file-zip.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/media.png";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};

export function getFileSummaries(categorizedFiles) {
    // Helper to get the latest createdAt from an array
    const getLatestDate = (filesArray) =>
        filesArray.length > 0
            ? [...filesArray]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].createdAt
            : null;

    const summaries = [
        {
            title: "Documents",
            url: "/documents",
            totalUploads: categorizedFiles.documents.length,
            icon: "/assets/icons/file-document-light.svg",
            lastUpdated: getLatestDate(categorizedFiles.documents),
        },
        {
            title: "Images",
            url: "/images",
            totalUploads: categorizedFiles.images.length,
            icon: "/assets/icons/file-image-light.svg",
            lastUpdated: getLatestDate(categorizedFiles.images),
        },
        {
            title: "Media",
            url: "/media",
            totalUploads: categorizedFiles.media.length,
            icon: "/assets/icons/file-video-light.svg",
            lastUpdated: getLatestDate(categorizedFiles.media),
        },
        {
            title: "Others",
            url: "/others",
            totalUploads: categorizedFiles.others.length,
            icon: "/assets/icons/file-other-light.svg",
            lastUpdated: getLatestDate(categorizedFiles.others),
        },
    ];

    return summaries;
}
