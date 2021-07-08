import React from "react";
import { Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";

type props = {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
};

function FileUploader(props: props) {
  const { onDrop } = props;
  const bg = useColorModeValue("gray.100", "gray.900");
  const bgIsDragActive = useColorModeValue("blue.100", "blue.900");
  const options: DropzoneOptions = {
    noClick: true,
    noKeyboard: true,
    onDrop,
  };
  const { getRootProps, getInputProps, open, isDragActive } =
    useDropzone(options);

  return (
    <Flex
      bg={isDragActive ? bgIsDragActive : bg}
      direction="column"
      padding="4"
      border="2px dashed rgba(0,0,0,0.1)"
      alignItems="center"
      borderRadius="md"
      {...getRootProps()}
    >
      <Text mb="2">Drop files here to upload...</Text>
      <Button onClick={open}>
        <Text>Browse files</Text>
      </Button>
      <input {...getInputProps()} />
    </Flex>
  );
}

export default FileUploader;
