/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Text } from "@mantine/core";
// import { uploadImage } from "../../../../utils/fileUpload";

export default function TextEditorTinyMce({
  form,
  validateName,
  label,
  required = false,
}) {
  const editorRef = useRef(null);

  // Function to handle editor content changes
  const handleEditorChange = (content) => {
    console.log("content", form.values[validateName]);
    form.setFieldValue(validateName, content);
  };

  return (
    <Box>
      <Text fw={500}>
        {label}
        <span
          style={{
            color: "red",
            marginLeft: "4px",
            display: required ? "inline" : "none",
          }}
        >
          *
        </span>
      </Text>
      <Editor
        apiKey="r4rgcqv340z2cowi2b7k1h57zott1h0nxxy8skgu017dwx5g"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={form.values[validateName]}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | anchor | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_url:
            "https://firebasestorage.googleapis.com/v0/b/carflys-b1b57.appspot.com/o",
          automatic_uploads: true,
          images_reuse_filename: true,
        }}
      />
      {form && form.errors[validateName] && (
        <Text color="red" size={"sm"} mt={5}>
          {form.errors[validateName]}
        </Text>
      )}
    </Box>
  );
}
