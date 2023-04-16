import "../styles/globals.css";
import Head from "next/head";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css"; // Remove if nothing is visible
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import {setupIonicReact} from "@ionic/react";
import NonSSRWrapper from "@/components/NonSSRWrapper";

setupIonicReact();

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <NonSSRWrapper>
        <Component {...pageProps} />
      </NonSSRWrapper>
    </>
  );
}

export default MyApp;
