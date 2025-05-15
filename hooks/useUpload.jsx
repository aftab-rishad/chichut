"use client";

import { upload } from "@imagekit/next";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

function useUpload(fileRef) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef(null);
  const [uploadedData, setUploadedData] = useState(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/ik-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  useEffect(() => {
    (async function () {
      const fileInput = fileRef;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        console.log(fileInput);
        return;
      }

      abortControllerRef.current = new AbortController();

      setIsUploading(true);
      setProgress(0);

      const file = fileInput.files[0];

      try {
        const authParams = await authenticator();
        const { signature, expire, token } = authParams;

        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
          file,
          fileName: file.name,
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          abortSignal: abortControllerRef.current.signal,
        });
        toast.success("Your file has been uploaded successfully.");
        setUploadedData(uploadResponse);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(`${error.message ?? "An error occurred during upload."}`);
      } finally {
        setIsUploading(false);
      }
    })();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fileRef]);
  return {
    isUploading,
    progress,
    data: uploadedData,
  };
}

export default useUpload;
