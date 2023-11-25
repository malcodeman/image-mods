import React from "react";
import Head from "next/head";
import { Box, Flex, Container, Button } from "@chakra-ui/react";
import { Minimize, Download, Trash2 } from "react-feather";
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
              size="sm"
              leftIcon={<Download size={16} />}
              onClick={() => saveAs(image, image.name)}
            >
              Download
            </Button>
          );
        },
      },
    ],
    []
  );
  const [isCompressLoading, setIsCompressLoading] =
    React.useState<boolean>(false);
  const [isZipLoading, setIsZipLoading] = React.useState<boolean>(false);
  const isTableEmpty: boolean = compressedFiles.length === 0;

  function showToast(description: string) {
    toast({
      title: "An error occurred.",
      description: description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  async function onDrop(acceptedFiles: File[]) {
    try {
      setIsCompressLoading(true);
      const files = await Promise.all(
        R.map(async (file) => {
          return await compressFile(file);
        }, acceptedFiles)
      );
      setCompressedFiles([...compressedFiles, ...files]);
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message);
      }
    } finally {
      setIsCompressLoading(false);
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

  async function downloadZip() {
    try {
      setIsZipLoading(true);
      const zip = new Zip();
      for (const file of compressedFiles) {
        zip.file(file.name, file);
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "imagemods.zip");
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message);
      }
    } finally {
      setIsZipLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Compress | Image Mods</title>
      </Head>
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
            <FileUploader onDrop={onDrop} isLoading={isCompressLoading} />
          </Box>
          <Box mb="4">
            <Button
              mr="4"
              size="sm"
              leftIcon={<Trash2 size={16} />}
              isDisabled={isTableEmpty}
              onClick={() => setCompressedFiles([])}
            >
              Clear list
            </Button>
            <Button
              size="sm"
              leftIcon={<Download size={16} />}
              isDisabled={isTableEmpty}
              isLoading={isZipLoading}
              onClick={downloadZip}
            >
              Download ZIP
            </Button>
          </Box>
          {!isTableEmpty && <Table columns={columns} data={compressedFiles} />}
        </Container>
      </Flex>
    </React.Fragment>
  );
}

export default Compress;
