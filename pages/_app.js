import Layout from "../components/Layout";
import "../styles/globals.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const route = useRouter();

  useEffect(() => {
    const isSignedIn = getCookie("token");
    if (isSignedIn) route.push("/todos");
    else route.push("/");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
