import Link from "next/link";
import {useRouter} from "next/router";
import {IonSpinner} from "@ionic/react";

export default function Home() {
  // wait for about 5 seconds then redirect to /splash

  const router = useRouter();
  setTimeout(() => {
    router.push("/splash");
  }, 5000);

  return (
    <div>
      <main className="flex items-center justify-center bg-green-200 text-3xl h-screen">
        <IonSpinner name="dots"></IonSpinner>
      </main>
    </div>
  );
}
