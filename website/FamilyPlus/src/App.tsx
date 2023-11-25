import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./component/layout";
import ConnectButton from "./component/connectButton";

export default function App() {
  return (
    <ChakraProvider>
      <Layout>
        <ConnectButton />
      </Layout>
    </ChakraProvider>
  )
}