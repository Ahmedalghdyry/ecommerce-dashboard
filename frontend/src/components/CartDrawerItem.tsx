import { Button, Divider, Flex, Img, Stack, Text } from "@chakra-ui/react";
import type { ICartItem } from "../interface";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { RemoveFromCart } from "../app/features/Cartslise";

const CartDrawerItem = ({id, price, quantity, title, thumbnail }: ICartItem) => {
   const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems={"center"} mb={2} py={2}>
        <Img
    src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.url}`}
          alt="title"
          w={"80px"}
          h={"80px"}
          rounded={"full"}
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Text fontSize={"sm"}>{title}</Text>
          <Text fontSize={"sm"}>${price}</Text>
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button size="md" colorScheme={"red"} w={"fit-content"} leftIcon={<BsTrash />} variant={"outline"}
          onClick={() => dispatch(RemoveFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
