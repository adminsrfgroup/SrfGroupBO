import React from "react";
import { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import "../config/i18n/i18n";
import { ToastContainer, toast } from "react-toastify";

import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/SignIn.scss";

import setupAxiosInterceptors from "../lib/axios-interceptor";
import Head from "next/head";
import { logout } from "@store/user/slice";
import { AuthGuard } from "../config/auth-guard";

setupAxiosInterceptors(() => store.dispatch(logout({})));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
        autoClose={5000}
      />
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}

export default MyApp;
