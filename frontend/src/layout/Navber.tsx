import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSun } from "react-icons/ci";
import { FaBars, FaRegMoon } from "react-icons/fa";
import { useState } from "react";
import ServicesCookie from "../services/ServicesCookie";
import { SliceCart } from "../app/features/Cartslise";
import { useDispatch, useSelector } from "react-redux";
import { onOpenCartDraweraction } from "../app/features/globalSlice";

const Navbars = () => {
  const [isopane, setIsopane] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const cartItems = useSelector(SliceCart);
  const Dispatch = useDispatch();

  const tockin = ServicesCookie.git("jwt");

  const LogoutHandler = () => {
    ServicesCookie.ramova("jwt");
    window.location.reload();
  };

  //   Handle

  const onOpen = () => {
    Dispatch(onOpenCartDraweraction());
  };

  return (
    <Box>
      <Box
        display={{
          base: "none",
          md: "flex",
        }}
        px="6"
        py="4"
        shadow="md"
      >
        <Flex align="center" justify="space-between" w="full">
          {/* Logo */}
          <Text fontSize="xl" fontWeight="bold">
            Ahmed
          </Text>

          {/* Links */}
          <HStack spacing="4">
            <Button as={Link} to="/" variant="ghost">
              Home
            </Button>

            <Button as={Link} to="/about" variant="ghost">
              About
            </Button>

            <Button as={Link} to="/ProductPage" variant="ghost">
              Product
            </Button>
            {tockin && (
  <Button as={Link} to="/dashboard" variant="ghost">
    Dashboard
  </Button>
)}
          </HStack>

          {/* Auth Buttons */}
          <HStack spacing="3">
            {tockin ? (
              <Box>
                <Button
                  as={Link}
                  variant="ghost"
                  colorScheme="purple"
                  border={"1px solid"}
                  borderColor={"purple.500"}
                  onClick={LogoutHandler}
                >
                  Logout
                </Button>
                

                <Button
                  as={Link}
                  mx={2}
                  variant="ghost"
                  colorScheme="purple"
                  border={"1px solid"}
                  borderColor={"purple.500"}
                  onClick={(e) => {
                    e.preventDefault();

                    onOpen();
                  }}
                >
                  Cart: ({cartItems.length})
                </Button>
              </Box>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                colorScheme="purple"
                border={"1px solid"}
                borderColor={"purple.500"}
              >
                Login
              </Button>
            )}

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <CiSun /> : <FaRegMoon />}
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Box display={{ base: "flex", md: "none" }} px="6" py="4" shadow="md">
        <Flex align="center" justify="space-between" w="full">
          <Text fontSize="xl" fontWeight="bold">
            Ahmed
          </Text>
          <Flex align="center" gap="4">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <CiSun /> : <FaRegMoon />}
            </Button>

            <Box>
              {/* icon */}
              <IconButton
                icon={<FaBars />}
                onClick={() => setIsopane(!isopane)}
                aria-label="menu"
              />

              {isopane && (
                <UnorderedList
                  position="absolute"
                  top="60px"
                  right="25px"
                  bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
                  p="4"
                  shadow="md"
                  h={"400px"}
                  w={"200px"}
                  zIndex={100}
                  borderRadius={"lg"}
                  display="flex"
                  flexDirection="column"
                >
                  <ListItem
                    as={Link}
                    to="/home"
                    p={"2"}
                    rounded={"md"}
                    _hover={{
                      bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
                      color: colorMode !== "light" ? "#9f7aea" : "white",
                      border: "transparent",
                    }}
                    fontSize={"20"}
                  >
                    Home
                  </ListItem>
                  <ListItem
                    as={Link}
                    to="/about"
                    p={"2 "}
                    rounded={"md"}
                    _hover={{
                      bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
                      color: colorMode !== "light" ? "#9f7aea" : "white",
                      border: "transparent",
                    }}
                    fontSize={"20"}
                  >
                    About
                  </ListItem>
                  <ListItem
                    as={Link}
                    to="/ProductPage"
                    p={"2"}
                    rounded={"md"}
                    _hover={{
                      bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
                      color: colorMode !== "light" ? "#9f7aea" : "white",
                      border: "transparent",
                    }}
                    fontSize={"20"}
                  >
                    Product
                  </ListItem>
              {tockin ? (
                <ListItem
                  as={Link}
                  to="/dashboard"
                  p={"2"}
                  rounded={"md"}
                  _hover={{
                    bg: colorMode === "light" ? "#9f7aea" : "#e6f3fd",
                    color: colorMode !== "light" ? "#9f7aea" : "white",
                    border: "transparent",
                  }}
                  fontSize={"20"}
                  >
                  Dashboard
                </ListItem>
              ) : null}
              </UnorderedList>
            )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbars;
