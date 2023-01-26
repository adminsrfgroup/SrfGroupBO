import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { allSessionSelector } from "@store/user/slice";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useSelector(allSessionSelector);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
