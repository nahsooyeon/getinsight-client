/* eslint-disable react/prop-types */
import '../styles/globals.scss';
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
