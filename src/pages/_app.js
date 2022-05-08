import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Wallet</title>
        </Head>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              hideProgressBar
              position="bottom-right"
              autoClose={2000}
            />
          </Layout>
        </ChakraProvider>
      </React.Fragment>
    );
  }
}
