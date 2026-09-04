import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { netowrkMode } from "../app/features/netowrkSlice";

interface IProps {
  children: ReactNode;
}

const InternetProvider = ({ children }: IProps) => {
    const dispatch = useDispatch();
  
  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>(undefined);
  const [isOnline, setIsOnline] = useState<boolean>(true);

useEffect(() => {
  const handleOnline = () => {
    setIsOnline(true);
    dispatch(netowrkMode(true));
  };
  const handleOffline = () => {
    setIsOnline(false);
    dispatch(netowrkMode(false));
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
  useEffect(() => {
    if (!isOnline) {
      toastIdRef.current = toast({
        title: "No Internet Connection",
        description: "Please check your internet connection.",
        status: "warning",
        isClosable: true,
        duration: null,
        icon: <BsWifiOff />,
      });
    } else {
      toast.closeAll();
    }
  }, [isOnline, toast]);
  return children;
};

export default InternetProvider;
