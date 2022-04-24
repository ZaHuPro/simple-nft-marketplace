import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

const metaData = {
  description: 'Creating the environment for business.',
  site_name: 'Simple NFT Marketplace',
  title: 'Simple NFT Marketplace',
  creator: 'ZaHuPro@GitHub.com',
};
export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="description" content={metaData.description} />
          <meta property="og:type" content="website" />
          <meta name="og:title" property="og:title" content={metaData.title} />
          <meta name="og:description" property="og:description" content={metaData.description} />
          <meta property="og:site_name" content={metaData.site_name} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={metaData.title} />
          <meta name="twitter:description" content={metaData.description} />
          <meta name="twitter:site" content={metaData.site_name} />
          <meta name="twitter:creator" content={metaData.creator} />
          <meta property="og:image:height" content="110" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
