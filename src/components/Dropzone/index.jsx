/* eslint-disable react/prop-types */
import { ActionIcon, Box, Image, Loader, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDropzone } from "react-dropzone";
import { Photo, X } from "tabler-icons-react";
import { uploadSingleFile } from "../../constants/firebase";
import { useEffect, useState } from "react";

export default function DropZone({ form, name, folderName, label }) {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const [url, setUrl] = useState(""); // Firebase URL
  const [progress, setProgress] = useState(null);
  const [preview, setPreview] = useState(""); // Local blob URL for preview

  const value = form.getInputProps(name).value;

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        form.setFieldValue(name, previewUrl); // Temporary preview
        uploadSingleFile({
          file,
          folderName,
          urlSetter: setUrl,
          setProgress,
        });
      }
    },
  });

  useEffect(() => {
    if (progress === 100 && url) {
      form.setFieldValue(name, url); // Final Firebase URL
      setPreview(""); // Clear preview
    }
  }, [progress, url, form, name]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: value == null ? 5 : 0,
        overflow: "hidden",
        borderWidth: "2px",
        borderStyle: "dashed",
        borderColor: isDragAccept ? "success.main" : isDragReject ? "error.main" : "gray",
        borderRadius: 16,
        width: "min(100%, 200px)",
        height: 200,
        outline: "none",
        transition: "border .24s ease-in-out",
        mx: "auto",
        textAlign: "center",
        "&:hover": {
          borderColor: "#62A82C",
          cursor: "pointer",
          boxShadow: "0px 10px 20px 0px rgb(0,0,0,0.1)",
        },
      }}
      {...getRootProps()}
    >
      {value == null ? (
        <>
          <input {...getInputProps()} />
          <Photo size={"25%"} />
          {isDragActive ? <Text>Drop the files here ...</Text> : <Text>Upload {label} here</Text>}
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {progress === null || progress === 100 ? (
            <Image
              src={preview || value}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              withPlaceholder
              placeholder={<Loader h={"200px"} m={"auto"} />}
            />
          ) : (
            <Loader h={"100%"} />
          )}
          <ActionIcon
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "white",
              backgroundColor: "purple",
              padding: 3,
              borderRadius: "50%",
            }}
            onClick={(e) => {
              e.stopPropagation();
              form.setFieldValue(name, null);
              form.setFieldError(name, null); // Optional: clear error
              setPreview("");
              setUrl("");
              setProgress(null);
            }}
          >
            <X />
          </ActionIcon>
        </Box>
      )}
      {form?.errors?.[name] && (
        <Text color="red" mt={10} size={isMobile ? "xs" : "sm"}>
          {form?.errors?.[name]}
        </Text>
      )}
    </Box>
  );
}
