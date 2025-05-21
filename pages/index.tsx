import React from "react";
import Head from "next/head";
import {
  SimpleGrid,
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRight, Crop, Layers, Minimize } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Compress Image",
    description: "Reduce the size of your Images without losing quality",
    icon: <Minimize size="24" color="#3d99f5" />,
    href: "/compress",
    isDisabled: false,
  },
  {
    title: "Crop Image",
    description: "Crop Images by defining a rectangle in pixels or percentages",
    icon: <Crop size="24" color="#7961f2" />,
    href: "/crop",
    isDisabled: true,
  },
  {
    title: "Image to PDF",
    description: "Transform Images to PDF",
    icon: <Layers size="24" color="#ffb700" />,
    href: "/transform",
    isDisabled: true,
  },
];

type props = {
  item: {
    title: string;
    description: string;
    icon: JSX.Element;
    href: string;
    isDisabled: boolean;
  };
};

function GridItem(props: props) {
  const { item, ...rest } = props;
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Link href={item.isDisabled ? "/" : item.href} passHref>
      <Flex
        backgroundColor={item.isDisabled ? "rgba(0,0,0,0.1)" : bg}
        borderRadius="md"
        cursor={item.isDisabled ? "not-allowed" : "pointer"}
        padding="4"
        border="2px solid rgba(0,0,0,0.1)"
        justifyContent="space-between"
        {...rest}
      >
        <Flex>
          <Box mr="4" display={{ base: "none", sm: "initial" }}>
            {item.icon}
          </Box>
          <Box>
            <Text fontWeight="bold">{item.title}</Text>
            <Text fontSize="sm">{item.description}</Text>
          </Box>
        </Flex>
        <Box display={{ base: "none", sm: "initial" }}>
          <ChevronRight size="16" />
        </Box>
      </Flex>
    </Link>
  );
}

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Image Mods</title>
      </Head>
      <Flex minH="100vh" alignItems="center">
        <Container maxWidth="container.lg">
          <Text fontSize="2xl" fontWeight="bold" align="center" mb="4">
            Most Popular Image Tools
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {tools.map((item) => (
              <GridItem key={item.title} item={item} />
            ))}
          </SimpleGrid>
        </Container>
      </Flex>
    </React.Fragment>
  );
}

export default Home;
