import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";

const ProductTableSkeleton = () => {
  return (
    <Stack maxW="85%" mx="auto" my={10}>
      {Array.from({ length: 10}, (_, idx) => (
        <Flex
          key={idx}
          alignItems="center"
          justifyContent={"space-between"}
          border={"1px solid #333"}
          rounded={"md"}
          h={"50px"}
          p={2}
        >
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
   

          <Flex>
            <Skeleton
              h="30px"
              w="50px"
              bg="gray"
              startColor="purple.300"
              endColor="purple.500"
              mr={3}
            />
            <Skeleton
              h="30px"
              w="50px"
              bg="gray"
              startColor="red.300"
              endColor="red.500"
              mr={3}

            />
            <Skeleton
              h="30px"
              w="50px"
              bg="gray"
              startColor="blue.300"
              endColor="blue.500"
            />
          </Flex>
        </Flex>
      ))}
      <Box>
          <Skeleton h="15px" w="250px" bg="gray" mx="auto"/>

      </Box>
    </Stack>
  );
};

export default ProductTableSkeleton;
