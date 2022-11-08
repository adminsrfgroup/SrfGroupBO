import React from "react";
import { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";

import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";

import "../styles/globals.css";
import "../styles/SignIn.scss";

import setupAxiosInterceptors from "../lib/axios-interceptor";
import Head from "next/head";

setupAxiosInterceptors(() => console.log);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
