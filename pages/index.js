import Link from "next/link";
import {useAppStore} from "@/store/store";
import {useRouter} from "next/router";
import {FullHeightGreenBG} from "@/components/pageShells";

export default function Home() {
  const {isFirstTimeLoggingIn} = useAppStore();
  const router = useRouter();
  // wait for 2 seconds then run function
  setTimeout(() => {
    if (isFirstTimeLoggingIn) {
      router.push("/firstTimeUsing");
    } else {
      router.push("/splash");
    }
  }, 2000);

  return (
    <FullHeightGreenBG>
      <div>
        <h1 className="text-green-900 text-4xl font-extrabold animate-bounce">
          kiLocal
        </h1>
      </div>
    </FullHeightGreenBG>
  );
}
