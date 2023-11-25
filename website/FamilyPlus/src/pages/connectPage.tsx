import Header from "../component/header";
import Footer from "../component/footer";
import Layout from "../component/layout";
import ConnectButton from "../component/connectButton";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <Layout>
        <ConnectButton />
      </Layout>
      <Footer />
    </div>
  );
}
