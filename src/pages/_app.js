import React from "react";
// import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/global.css";

const options = {
  position: positions.TOP_CENTER,
  timeout: 8000,
  offset: "50px",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 500,
  },
};

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
        <AlertProvider template={AlertTemplate} {...options}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Peacock Club</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AlertProvider>
      </React.Fragment>
    );
  }
}
