import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDraweraction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clerCart, SliceCart } from "../app/features/Cartslise";

interface IProps {
  title: string;
}

const CartDrawer = ({ title }: IProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const  cartProducts = useSelector(SliceCart);
  const dispatch = useDispatch();

  //   Handle

  const onClose = () => {
    dispatch(onCloseCartDraweraction());
  };



  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>
            {cartProducts.length ?
              cartProducts.map(item => (
                <CartDrawerItem key={item.id} {...item} />
              )): <Text >Your cart is empty</Text>
            }
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              colorScheme="red"
              onClick={() => {dispatch(clerCart())}}
            >
              Color All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
