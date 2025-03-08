import Image from "next/image";
import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
const files = {
    documents: [
        {
            $id: "1",
            name: "Document 1",
            type: "pdf",
            extension: "pdf",
            url: "/path/to/document1.pdf",
            $createdAt: new Date().toISOString(),
        },
        {
            $id: "2",
            name: "Document 2",
            type: "docx",
            extension: "docx",
            url: "/path/to/document2.docx",
            $createdAt: new Date().toISOString(),
        },
        {
            $id: "3",
            name: "Document 1",
            type: "pdf",
            extension: "pdf",
            url: "/path/to/document1.pdf",
            $createdAt: new Date().toISOString(),
        },
        {
            $id: "4",
            name: "Document 2",
            type: "docx",
            extension: "docx",
            url: "/path/to/document2.docx",
            $createdAt: new Date().toISOString(),
        },
    ],
};

const usageSummary = [
    {
        title: "Images",
        size: 1024 * 1024 * 5, // 5 MB
        url: "/path/to/image-icon.png",
        icon:"/assets/icons/file-image-light.svg",
        latestDate: new Date().toISOString(),
    },
    {
        title: "Documents",
        size: 1024 * 1024 * 10, // 10 MB
        url: "/path/to/document-icon.png",
        icon:"/assets/icons/file-document-light.svg",
        latestDate: new Date().toISOString(),
    },
    {
        title: "Media",
        size: 1024 * 1024 * 20, // 20 MB
        url: "/path/to/video-icon.png",
        icon:"/assets/icons/file-video-light.svg",
        latestDate: new Date().toISOString(),
    },
    {
        title: "Others",
        size: 1024 * 1024 * 8, // 8 MB
        url: "/path/to/music-icon.png",
        icon:"/assets/icons/file-other-light.svg",
        latestDate: new Date().toISOString(),
    },
];

const totalSpace = {
    used: 1024 * 1024 * 15, // 15 MB
};

const Dashboard = async () => {
    return (
        <div className="dashboard-container ">
            <section>
                <div className="chart">
                    <div className="flex items-center justify-between min-h-30">
                        <h2 className="h3 xl:h2 text-light-100">Usage summary</h2>
                        <p className="caption text-light-300">
                            {convertFileSize(totalSpace.used)} used of 100MB
                        </p>
                    </div>
                </div>

                {/* Uploaded file type summaries */}
                <ul className="dashboard-summary-list">
                    {usageSummary.map((summary) => (
                        <Link
                            href={summary.url}
                            key={summary.title}
                            className="dashboard-summary-card"
                        >
                            <div className="space-y-5">
                                <div className="flex justify-between gap-3">
                                    <Image
                                        src={summary.icon}
                                        width={100}
                                        height={100}
                                        alt="uploaded image"
                                        className="summary-type-icon"
                                    />
                                    <h4 className="summary-type-size">
                                        {convertFileSize(summary.size) || 0}
                                    </h4>
                                </div>

                                <h5 className="summary-type-title">{summary.title}</h5>
                                <Separator className="bg-light-400" />
                                <p className="text-gray-400">Last Update</p>
                                {/* <FormattedDateTime
                                    date={summary.latestDate}
                                    className="text-center"
                                />  */}
                                <p className="">Dec</p>
                            </div>
                        </Link>
                    ))}
                </ul>
            </section>

            {/* Recent files uploaded */}
            <section className="dashboard-recent-files">
                <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
                {files.documents.length > 0 ? (
                    <ul className="mt-5 flex flex-col gap-5">
                        {files.documents.map((file) => (
                            <Link
                                href={file.url}
                                target="_blank"
                                className="flex items-center gap-3"
                                key={file.$id}
                            >
                                <Thumbnail
                                    type={file.type}
                                    extension={file.extension}
                                    url={file.url}
                                />

                                <div className="recent-file-details">
                                    <div className="flex flex-col gap-1">
                                        <p className="recent-file-name">{file.name}</p>
                                        {/* <FormattedDateTime
                                            date={file.$createdAt}
                                            className="caption"
                                        /> */}
                                        <p className="caption">Dec 12, 2021</p>
                                    </div>

                                    <ActionDropdown file={file} />
                                </div>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-list">No files uploaded</p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;