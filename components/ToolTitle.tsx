import { Box, Flex, Text } from "@chakra-ui/react";

type props = {
  icon: JSX.Element;
  title: string;
};

function ToolTitle(props: props) {
  const { icon, title, ...rest } = props;

  return (
    <Flex alignItems="center" justifyContent="center" {...rest}>
      <Box mr="4" display={{ base: "none", sm: "initial" }}>
        {icon}
      </Box>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}

export default ToolTitle;
