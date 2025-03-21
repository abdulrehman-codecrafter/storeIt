"use client";

import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { useAuth } from "@clerk/nextjs"; 

const FilesContext = createContext();

const initialState = {
    files: null,
    categorizedFiles: {
        documents: [],
        images: [],
        media: [],
        others: [],
    },
    toastVisible: false,
    filesLoading: true,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_FILES":
            const files = payload || [];
            return {
                ...state,
                files,
                categorizedFiles: {
                    documents: files.filter(
                        (file) => file.fileType === "document"
                    ),
                    images: files.filter((file) => file.fileType === "image"),
                    media: files.filter((file) => file.fileType === "media"),
                    others: files.filter((file) => file.fileType === "other"),
                },
            };
        case "ADD_FILE":
            const updatedFiles = [...(state.files || []), payload];
            return {
                ...state,
                files: updatedFiles,
                categorizedFiles: {
                    documents: updatedFiles.filter(
                        (file) => file.fileType === "document"
                    ),
                    images: updatedFiles.filter(
                        (file) => file.fileType === "image"
                    ),
                    media: updatedFiles.filter(
                        (file) => file.fileType === "media"
                    ),
                    others: updatedFiles.filter(
                        (file) => file.fileType === "other"
                    ),
                },
            };
        case "SHOW_TOAST":
            return { ...state, toastVisible: true };
        case "HIDE_TOAST":
            return { ...state, toastVisible: false };
        case "HIDE_FILES_LOADING":
            return { ...state, filesLoading: false };
        default:
            return state;
    }
};

export default function FilesContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isSignedIn, userId } = useAuth(); // Clerk hook to track auth state

    const fetchFiles = async () => {
        try {
            const result = await fetch("/api/files", {
                method: "GET",
            });
            const data = await result.json();
            dispatch({ type: "SET_FILES", payload: data.files });
        } catch (err) {
            console.log("Failed to fetch files:", err);
        } finally {
            dispatch({ type: "HIDE_FILES_LOADING" });
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [isSignedIn, userId]); // Refetch when auth state changes

    return (
        <FilesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FilesContext.Provider>
    );
}

export const useFilesContext = () => useContext(FilesContext);