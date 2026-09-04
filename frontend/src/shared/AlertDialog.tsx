import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onHandler: () => void;
  title:string
  descrption:string;
  okText?:string
  cancleText?:string;
  variant?:string,
  isLoading:boolean
}
export default function AlertDialogExample({
  isOpen,
  onClose,
  cancleText= "cancle",
  descrption,
  okText= "Ok",
  title,
  variant="solid",
  onHandler,
  isLoading
  
}: IProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay  bg={"blackAlpha.500"} />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {descrption}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ref={cancelRef } variant={variant}  isLoading={isLoading}  onClick={onHandler} >
              {okText}
            </Button>
            <Button  ml={3}  onClick={onClose}>
              {cancleText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
