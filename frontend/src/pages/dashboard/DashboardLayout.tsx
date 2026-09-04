import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

// ================= NAV ITEMS =================

const LinkItems = [
  { name: "dashboard", icon: FiHome, to: "/dashboard" },
  { name: "Products", icon: FiUsers, to: "/dashboard/product" },
  { name: "Home", icon: FiSettings, to: "/" },
];

// ================= NAVBAR =================

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      h="16"
      px={4}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      align="center"
      justify="flex-end"
    >
      <IconButton
        aria-label="Open Menu"
        icon={<FiMenu />}
        variant="ghost"
      />
    </Flex>
  );
};

// ================= SIDEBAR =================

const Sidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [active, setActive] = useState("Home");

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <>
      {open && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.500"
          zIndex={40}
          onClick={onClose}
        />
      )}

      <Box
        position={{ base: "fixed", md: "static" }}
        left={0}
        top={0}
        w="64"
        h="100vh"
        bg={bg}
        color={textColor}
        borderRight="1px solid"
        borderColor="gray.200"
        zIndex={50}
        transform={{
          base: open ? "translateX(0)" : "translateX(-100%)",
          md: "translateX(0)",
        }}
        transition="0.3s"
      >
        {/* HEADER */}
        <Flex
          justify="space-between"
          align="center"
          p={4}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Text fontWeight="bold" fontSize="lg">
            Dashboard
          </Text>

          <IconButton
            aria-label="Close"
            icon={<FiX />}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>

       
        <VStack p={2} align="stretch">
          {LinkItems.map((link) => (
            <Link key={link.name} to={link.to} onClick={() => setActive(link.name)}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="md"
                bg={active === link.name ? "purple.500" : "transparent"}
                color={active === link.name ? "white" : textColor}
                _hover={{
                  bg: "purple.500",
                  color: "white",
                }}
              >
                <Icon as={link.icon} />
                <Text fontSize="sm">{link.name}</Text>
              </Flex>
            </Link>
          ))}
        </VStack>

 
      </Box>
    </>
  );
};

// ================= DASHBOARD LAYOUT =================

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex minH="100vh" bg={pageBg}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Flex direction="column" flex={1}>
        <Navbar  />

        <Box p={6}>{<Outlet/>}</Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;