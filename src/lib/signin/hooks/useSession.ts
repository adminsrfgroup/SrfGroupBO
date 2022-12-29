import { useSelector } from "react-redux";
import { currentUser } from "@store/user/slice";

export const useSession = () => {
  const currentUserSelector = useSelector(currentUser) ?? {};
  return {
    currentUserSelector
  } as const;
};
