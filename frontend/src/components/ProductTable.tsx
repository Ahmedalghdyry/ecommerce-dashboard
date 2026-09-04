import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  apiSlice,
  useCreateProductDashboardMutation,
  useDeletProductDashboardMutation,
  useGetProductDashboardQuery,
  useUpdateProductDashboardMutation,
} from "../app/services/apiSlice";
import ProductTableSkeleton from "./TableSkelebon";
import type { IProductTable, IProductToEdit } from "../interface";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import AlertDialogExample from "../shared/AlertDialog";
import { useEffect, useState, type ChangeEvent } from "react";
import CustomManual from "../shared/Modal";
import ServicesCookie from "../services/ServicesCookie";
import { useDispatch, useSelector } from "react-redux";
import { selectNetowrk } from "../app/features/netowrkSlice";

const ProductTable = () => {
  const { isOnline } = useSelector(selectNetowrk);
  const dispatch = useDispatch();
  const [productID, setProductID] = useState<string | null>();
  const [productToEdit, setProductToEdit] = useState<IProductToEdit | null>(
    null,
  );

  const [productToCreate, setProductToCreate] = useState<IProductToEdit>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail: {
      url: "",
    },
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { data, isLoading } = useGetProductDashboardQuery({ page: 1 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const {
    isOpen: isOpenModalCreate,
    onOpen: onOpenModalCreate,
    onClose: onCloseModalCreate,
  } = useDisclosure();

  const [
    UpdateProduct,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateProductDashboardMutation();

  const [CreateProduct, { isLoading: isLoadingCreate, isSuccess: isSuccessCreate }] = useCreateProductDashboardMutation();

  // Handler

  const onSubmitHandlerCreate = async () => {
    const result = await CreateProduct({
      documentId: productID,
      body: {
        data: {
          title: productToCreate?.title,
          description: productToCreate?.description,
          price: productToCreate?.price,
          stock: productToCreate?.stock,
        },
      },
    }).unwrap();
    
    if (thumbnail) {
      const formData = new FormData();
      formData.append("files", thumbnail);
      formData.append("ref", "api::product.product");
      formData.append("refId", String(result.data.id));
      formData.append("field", "thumbnail");

      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ServicesCookie.git("jwt")}`,
        },
        body: formData,
      });
      dispatch(apiSlice.util.invalidateTags(["products"]));
    }

  };

  const onSubmitHandler = async () => {
    const result = await UpdateProduct({
      documentId: productID,
      body: {
        data: {
          title: productToEdit?.title,
          description: productToEdit?.description,
          price: productToEdit?.price,
          stock: productToEdit?.stock,
           thumbnail: productToEdit?.thumbnail?.id, 
        },
      },
    }).unwrap();
    if (thumbnail) {
      const formData = new FormData();
      formData.append("files", thumbnail);
      formData.append("ref", "api::product.product");
      formData.append("refId", String(result.data.id));
      formData.append("field", "thumbnail");

      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ServicesCookie.git("jwt")}`,
        },
        body: formData,
      });
       dispatch(apiSlice.util.invalidateTags(["products"]));
    }
  };

  // Create...........

  const onChangeHandlerCreate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setProductToCreate({
      ...productToCreate,
      [name]: value,
    });
  };
  const onChangeHandlerThumbnailCreate = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.files![0]);
  };

  const onChangeHandlerStockCreate = (value: string) => {
    setProductToCreate({
      ...productToCreate,
      stock: +value,
    });
  };
  const onChangeHandlerPriceCreate = (value: string) => {
    setProductToCreate({
      ...productToCreate,
      price: +value,
    });
  };

  // Ubdit....

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };
  const onChangeHandlerThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.files![0]);
  };

  const onChangeHandlerStock = (value: string) => {
    setProductToEdit({
      ...productToEdit,
      stock: +value,
    });
  };
  const onChangeHandlerPrice = (value: string) => {
    setProductToEdit({
      ...productToEdit,
      price: +value,
    });
  };

  const [dastroyProduct, { isLoading: isLoadingDastroy, isSuccess }] =
    useDeletProductDashboardMutation();

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, react-hooks/set-state-in-effect
      (setProductID(null), onClose());
    }
  }, [isSuccess, onClose]);
  useEffect(() => {
    if (isSuccessUpdate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductID(null);
      onCloseModal();
    }
  }, [isSuccessUpdate, onCloseModal]);

 useEffect(() => {
    if (isSuccessCreate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductToCreate({
         title: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail: {
      url: "",
    },

      });
      onCloseModalCreate();
    }
  }, [isSuccessCreate, onCloseModalCreate]);



  if (isLoading || !isOnline) return <ProductTableSkeleton />;
  return (
    <>
      <Flex direction={"column"} maxW="85%" mx="auto" my={6}>
        <Button
          ml="auto"
          w={"fit-content"}
          variant={"solid"}
          colorScheme="blue"
          my={6}
          onClick={onOpenModalCreate}
        >
          created
        </Button>

        <TableContainer border={"1px solid #e2e8f0"} rounded={"lg"} p={3}>
          <Table size="md" maxW="85%" mx="auto" my={"10px"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th> categories</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((product: IProductTable) => (
                <Tr key={product.id}>
                  <Th>{product.id}</Th>
                  <Th>{product.title}</Th>
                  <Td>
                    {product.categories.map((cat) => (
                      <div key={cat.id}>{cat.title}</div>
                    ))}
                  </Td>
                  <Td>
                    {product.thumbnail ? (
                      <Image
                        rounded="full"
                        objectFit="contain"
                        boxSize="45px"
                        src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                        alt={product.thumbnail.alternativeText }
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </Td>
                  <Td isNumeric>${product.price}</Td>
                  <Td isNumeric>{product.stock}</Td>

                  <Td>
                    <Button
                      as={Link}
                      to={`/product/${product.id}`}
                      variant={"solid"}
                      colorScheme="purple"
                      mr={3}
                    >
                      <AiOutlineEyeInvisible />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant={"solid"}
                      mr={3}
                      onClick={() => {
                        setProductID(product.documentId);
                        onOpen();
                      }}
                    >
                      <BsTrash />
                    </Button>
                    <Button
                      variant={"solid"}
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        setProductID(product.documentId);
                        setProductToEdit(product);
                        onOpenModal();
                      }}
                    >
                      <FiEdit2 />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>id</Th>
                <Th>title</Th>
                <Th>categories</Th>
                <Th>thumbnail</Th>
                <Th isNumeric>price</Th>
                <Th isNumeric>stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
          <TableContainer>
            Total Entrise {data?.data?.length ?? 0}
          </TableContainer>
        </TableContainer>
        <AlertDialogExample
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          descrption="Are you sure you want to discard all of your notes?  words will be
        deleted."
          title="Discard Changes?"
          variant="outline"
          isLoading={isLoadingDastroy}
          onHandler={() => dastroyProduct(productID!)}
        />

        <CustomManual
          title="Update product"
          isOpen={isOpenModal}
          onClose={onCloseModal}
          onOk={onSubmitHandler}
          isLoading={isLoadingUpdate}
        >
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input
              value={productToEdit?.title}
              name="title"
              placeholder="product title"
              my={3}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel>description</FormLabel>

            <Textarea
              name="description"
              value={productToEdit?.description}
              placeholder="product description"
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel>price</FormLabel>
            <NumberInput
              name="price"
              defaultValue={productToEdit?.price}
              precision={2}
              step={0.2}
              my={3}
              onChange={onChangeHandlerPrice}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>stock</FormLabel>
            <NumberInput
              name="stock"
              defaultValue={productToEdit?.stock}
              min={10}
              max={20}
              my={3}
              onChange={onChangeHandlerStock}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>thumbnail</FormLabel>
            <Input
              id="thumbnail"
              type="file"
              h={"full"}
              p={3}
              placeholder="product title"
              accept="image/png,image/jpg,image/jpeg"
              onChange={onChangeHandlerThumbnail}
            />
          </FormControl>
        </CustomManual>

        {/* Create */}

        <CustomManual
          title="Create product"
          isOpen={isOpenModalCreate}
          onClose={onCloseModalCreate}
          onOk={onSubmitHandlerCreate}
          isLoading={isLoadingCreate}
        >
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input
              value={productToCreate?.title}
              name="title"
              placeholder="product title"
              my={3}
              onChange={onChangeHandlerCreate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>description</FormLabel>

            <Textarea
              name="description"
              value={productToCreate?.description}
              placeholder="product description"
              onChange={onChangeHandlerCreate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>price</FormLabel>
            <NumberInput
              name="price"
              defaultValue={productToCreate?.price}
              precision={2}
              step={0.2}
              my={3}
              onChange={onChangeHandlerPriceCreate}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>stock</FormLabel>
            <NumberInput
              name="stock"
              defaultValue={productToCreate?.stock}
              min={10}
              max={20}
              my={3}
              onChange={onChangeHandlerStockCreate}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>thumbnail</FormLabel>
            <Input
              id="thumbnail"
              type="file"
              h={"full"}
              p={3}
              placeholder="product title"
              accept="image/png,image/jpg,image/jpeg"
              onChange={onChangeHandlerThumbnailCreate}
            />
          </FormControl>
        </CustomManual>
      </Flex>
    </>
  );
};

export default ProductTable;
