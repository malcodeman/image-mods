import React from "react";
import { Box, Flex, Container, Button } from "@chakra-ui/react";
import { Minimize, Download } from "react-feather";
import Compressor from "compressorjs";
import { saveAs } from "file-saver";
import * as R from "ramda";
import { useToast } from "@chakra-ui/react";
import Zip from "jszip";

import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Breadcrumb from "../components/Breadcrumb";
import ToolTitle from "../components/ToolTitle";

import utils from "../utils";

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
  const [compressedFiles, setCompressedFiles] = React.useState<File[]>([]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Size",
        accessor: "size",
        Cell: function sizeCell(props: any) {
          return <>{utils.bytesToSize(props.value)}</>;
        },
        Footer: function sizeFooter(props: any) {
          const files: File[] = props.data;
          return (
            <>
              Total:{" "}
              {utils.bytesToSize(R.sum(R.map((item) => item.size, files)))}
            </>
          );
        },
      },
      {
        accessor: "blob",
        Cell: function blobCell(props: any) {
          const image: File = props.row.original;
          return (
            <Button
              leftIcon={<Download size={16} />}
              onClick={() => saveAs(image, image.name)}
            >
              Download
            </Button>
          );
        },
        Header: function blobHeader() {
          async function downloadZip() {
            try {
              const zip = new Zip();
              for (const file of compressedFiles) {
                zip.file(file.name, file);
              }
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(content, "imagemods.zip");
            } catch (err) {
              toast({
                title: "An error occurred.",
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }

          return (
            <Button leftIcon={<Download size={16} />} onClick={downloadZip}>
              Download ZIP
            </Button>
          );
        },
      },
    ],
    [compressedFiles, toast]
  );
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

  async function compressFile(file: File): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        success: (result) => {
          resolve(new File([result], file.name, { type: result.type }));
        },
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
        {compressedFiles.length > 0 && (
          <Table columns={columns} data={compressedFiles} />
        )}
      </Container>
    </Flex>
  );
}

export default Compress;
