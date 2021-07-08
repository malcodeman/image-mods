import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import { Crop as CropIcon } from "react-feather";

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
    value: "/crop",
    label: "Crop",
  },
];

function Crop() {
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
            title="Crop Image"
            icon={<CropIcon size="24" color="#7961f2" />}
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

export default Crop;
