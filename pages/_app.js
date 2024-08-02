import "@/styles/globals.css";
import Header from "@/components/modules/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
