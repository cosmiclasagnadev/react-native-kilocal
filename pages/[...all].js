import dynamic from "next/dynamic";
import MyApp from "./_app";

const App = dynamic(() => MyApp, {
  ssr: false,
});

export default function Index() {
  return <App />;
}
