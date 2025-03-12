"use client";
import Image from "next/image";
import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import Chart from "@/components/Chart";
import { useFilesContext } from "@/contexts/filesContext";
import FormattedDateTime from "@/components/FormattedDataTime";
import { getFileSummaries } from "@/lib/utils";



const Dashboard = () => {
    const { files, categorizedFiles } = useFilesContext();
    const recentFiles = files
        ? files
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 10)
        : [];
    

        const usageSummaries = getFileSummaries(categorizedFiles);

    return (
        <div className="dashboard-container ">
            <section>
                <Chart />

                {/* Uploaded file type summaries */}
                <ul className="dashboard-summary-list">
                    {usageSummaries.map((summary) => (
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
                                        {summary.totalUploads}
                                    </h4>
                                </div>

                                <h5 className="summary-type-title">{summary.title}</h5>
                                <Separator className="bg-light-400" />
                                <p className="text-gray-400">Last Update</p>
                                <FormattedDateTime
                                    date={summary.lastUpdated}
                                    className="text-center text-black"
                                /> 
                            </div>
                        </Link>
                    ))}

                    
                </ul>
            </section>

            {/* Recent files uploaded */}
            <section className="dashboard-recent-files">
                <h2 className="h3 xl:h2 text-light-100">
                    Recent files uploaded
                </h2>
                {recentFiles?.length > 0 ? (
                    <ul className="mt-5 flex flex-col gap-5">
                        {recentFiles.map((file) => (
                            <Link
                                href={file.fileUrl}
                                target="_blank"
                                className="flex items-center gap-3"
                                key={file._id}
                                download={true}
                            >
                                <Thumbnail
                                    type={file.fileType}
                                    extension={file.fileExtension}
                                    url={file.fileUrl}
                                    isRecent={true}
                                    className="w-14 h-9"
                                />

                                <div className="recent-file-details">
                                    <div className="flex flex-col gap-1">
                                        <p className="recent-file-name">
                                            {file.name}
                                        </p>
                                        <FormattedDateTime
                                            date={file.createdAt}
                                            className="caption"
                                        />
                                        <p className="caption line-clamp-1 max-w-[300px]">
                                            {file.fileName}
                                        </p>
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
