import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/Axios.config";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import ProductSkeletonProduct from "../components/ProductSkeletonProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/Cartslise";
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
 

  const { data, isLoading } = useQuery({
    
    queryKey: ["product", id],
    queryFn: async () => {
       const { data } = await axiosInstance.get(
        `/products?filters[id][$eq]=${id}&populate=thumbnail&populate=categories&fields=title,description,price`,
      );

      return data.data[0]
    },
    enabled: !!id,
  });

    if (isLoading) {
    return (
       <Grid
      m={"30"}
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={6}
        maxW={"sm"}
        mx={"auto"}
        mb={"20"}
        bg={"none"}
    >
        {Array.from({ length: 1 }).map((_, index) => (
          <ProductSkeletonProduct key={index} />
        ))}
      </Grid>
    );
  }

  const goBack = () => navigate(-1);



  // Handle

  const addTocartHandler = () => {
    dispatch(addToCart(data))
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW={"sm"}
        mx={"auto"}
        my={"7"}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={"2"}>Back</Text>
      </Flex>
      <Card
        maxW={"sm"}
        mx={"auto"}
        mb={"20"}
        bg={"none"}
        border={"1px solid #a8b5c8"}
      >
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${data.thumbnail.url}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            boxSize={"300px"}
            rounded={"full"}
            mx={"auto"}
          />

          <Stack mt="6" spacing="3">
            <Heading textAlign={"center"} fontSize={"sm"}>
              {data.title}
            </Heading>
            <Text textAlign={"center"} fontSize={"sm"}>
              {data.description}
            </Text>

            {data.categories?.map((category: { id: string; title: string }) => (
              <Text
                key={category.id}
                borderRadius="md"
                px="2"
                py="1"
                textAlign="center"
                fontSize="sm"
              >
                {category.title}
              </Text>
            ))}

            <Text color="#9f7aea" fontSize="2xl" textAlign={"center"}>
              ${data.price.toFixed(2)}
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
            _hover={{
              bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
              color: colorMode !== "light" ? "#9f7aea" : "white",
              border: "transparent",
            }}
            onClick={addTocartHandler}
          >
            view to cart
          </Button>
     
        </CardFooter>
      </Card>
    </>
  );
};

export default Product;
