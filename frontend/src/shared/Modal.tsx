import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps {
  title: string;
  OkText?: string;
  CancelText?: string;
  isOpen: boolean;
  onClose: ()=>void;
  children: ReactNode;
  onOk: ()=>void;
  isLoading: boolean

}

const CustomManual = ({CancelText= "cancel",OkText= "Ok" ,children,isOpen,onClose,title,onOk,isLoading}: IProps) => {

  return (
    <>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onOk} isLoading={isLoading}>
              {OkText}
            </Button>
            <Button onClick={onClose}>{CancelText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomManual;
