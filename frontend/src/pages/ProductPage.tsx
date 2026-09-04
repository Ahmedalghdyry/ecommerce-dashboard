import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../config/Axios.config";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../interface";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/products?populate=categories&populate=thumbnail",
      );

      return data;
    },
  });

  if (isLoading) {
    return (
       <Grid
      m={"30"}
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={6}
    >
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid
    
      m={"30"}
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={5}
    >
      {data?.data.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductPage;
