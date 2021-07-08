import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRight } from "react-feather";
import Link from "next/link";

type props = {
  links: { value: string; label: string }[];
};

function Breadcrumb(props: props) {
  const { links, ...rest } = props;

  return (
    <ChakraBreadcrumb separator={<ChevronRight size={20} />} {...rest}>
      {links.map((item) => (
        <BreadcrumbItem key={item.value}>
          <BreadcrumbLink as={Link} href={item.value}>
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
}

export default Breadcrumb;
