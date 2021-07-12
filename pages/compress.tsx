import React from "react";
import { Box, Flex, Container, Button } from "@chakra-ui/react";
import { Minimize } from "react-feather";
import Compressor from "compressorjs";
import { saveAs } from "file-saver";
import * as R from "ramda";
import { useToast } from "@chakra-ui/react";

import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Breadcrumb from "../components/Breadcrumb";
import ToolTitle from "../components/ToolTitle";

import utils from "../utils";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Size",
    accessor: "size",
    Cell: function size(props: any) {
      return <>{utils.bytesToSize(props.value)}</>;
    },
  },
  {
    Header: "",
    accessor: "blob",
    Cell: function downloadBlob(props: any) {
      const image: File = props.row.original;
      return (
        <Button onClick={() => saveAs(image, image.name)}>Download</Button>
      );
    },
  },
];

const links = [
  {
    value: "/",
    label: "Home",
  },
  {
    value: "/compress",
    label: "Compress",
  },
];

function Compress() {
  const toast = useToast();
  const [compressedFiles, setCompressedFiles] = React.useState<Blob[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onDrop(acceptedFiles: File[]) {
    try {
      setIsLoading(true);
      const files = await Promise.all(
        R.map(async (file) => {
          return await compressFile(file);
        }, acceptedFiles)
      );
      setCompressedFiles([...compressedFiles, ...files]);
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function compressFile(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        success: resolve,
        error: reject,
      });
    });
  }

  return (
    <Flex paddingTop="4" paddingBottom="4">
      <Container maxWidth="container.lg">
        <Box mb="10">
          <Breadcrumb links={links} />
        </Box>
        <Box mb="4">
          <ToolTitle
            title="Compress Image"
            icon={<Minimize size="24" color="#3d99f5" />}
          />
        </Box>
        <Box mb="4">
          <FileUploader onDrop={onDrop} isLoading={isLoading} />
        </Box>
        <Table columns={columns} data={compressedFiles} />
      </Container>
    </Flex>
  );
}

export default Compress;
