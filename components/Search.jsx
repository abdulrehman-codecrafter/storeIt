"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Thumbnail from "@/components/Thumbnail";
import FormattedDataTime from "@/components/FormattedDataTime";
import { useFilesContext } from "@/contexts/filesContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const {files}=useFilesContext()

  useEffect(() => {
    const fetchFiles = async () => {
      if (query.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      
      const filteredDocuments=files?.filter((file)=>{
        return file.fileName.toLowerCase().includes(query)
      })
      setResults(filteredDocuments)
      setOpen(true);
    };

    fetchFiles();
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.fileType === "media" ? "media" : file.fileType + "s"}/${file._id}`,
    );
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results?.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file._id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.fileType}
                      extension={file.filExtension}
                      url={file.fileUrl}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.fileName}
                    </p>
                  </div>

                  <FormattedDataTime
                    date={file.createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;