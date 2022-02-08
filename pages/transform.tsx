import React from "react";
import Head from "next/head";
import { Box, Flex, Container } from "@chakra-ui/react";
import { Layers } from "react-feather";

import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Breadcrumb from "../components/Breadcrumb";
import ToolTitle from "../components/ToolTitle";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Size",
    accessor: "size",
  },
];
const links = [
  {
    value: "/",
    label: "Home",
  },
  {
    value: "/transform",
    label: "Transform",
  },
];

function Transform() {
  const [files, setFiles] = React.useState<File[]>([]);
  function onDrop(acceptedFiles: File[]) {
    setFiles([...files, ...acceptedFiles]);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Image Mods | Transform</title>
      </Head>
      <Flex paddingTop="4" paddingBottom="4">
        <Container maxWidth="container.lg">
          <Box mb="10">
            <Breadcrumb links={links} />
          </Box>
          <Box mb="4">
            <ToolTitle
              title="Transform Image"
              icon={<Layers size="24" color="#ffb700" />}
            />
          </Box>
          <Box mb="4">
            <FileUploader onDrop={onDrop} />
          </Box>
          <Table columns={columns} data={files} />
        </Container>
      </Flex>
    </React.Fragment>
  );
}

export default Transform;
