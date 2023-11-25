import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-r, orange.300, yellow.300, red.200)"
      alignItems="center"
      justifyContent="center"
      flexDirection="column" // Align items in a column
    >
      {children}
    </Flex>
  );
}
