import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import { Minimize } from "react-feather";

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
    value: "/compress",
    label: "Compress",
  },
];

function Compress() {
  const [files, setFiles] = React.useState<File[]>([]);
  function onDrop(acceptedFiles: File[]) {
    setFiles([...files, ...acceptedFiles]);
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
          <FileUploader onDrop={onDrop} />
        </Box>
        <Table columns={columns} data={files} />
      </Container>
    </Flex>
  );
}

export default Compress;
