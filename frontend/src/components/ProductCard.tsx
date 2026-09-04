import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IProduct } from "../interface";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
          alt="Green double couch with wooden legs"
          
          borderRadius="lg"
          boxSize={"200px"}
          rounded={"full"}
          mx={"auto"}
        />
        <Stack mt="6" spacing="3">
          <Heading textAlign={"center"} fontSize={"sm"}>
            {product.title}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"}>
            {product.description}
          </Text>
          <Text color="#9f7aea" fontSize="2xl" textAlign={"center"}>
            ${product.price.toFixed(2)}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          bg={colorMode !== "light" ? "#9f7aea" : "#e6f3fd"}
          color={colorMode === "light" ? "#9f7aea" : "#e6f3fd"}
          variant="outline"
          border={"none"}
          py="5"
          w="full"
          as={Link}
          to={`/product/${product.id}`}
          _hover={{
            bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
            color: colorMode !== "light" ? "#9f7aea" : "white",
            border: "transparent",
          }}
        >
          view to cart
        </Button>
        {/* <Button onClick={toggleColorMode} w="full">
            toggleColorMode
          </Button> */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
