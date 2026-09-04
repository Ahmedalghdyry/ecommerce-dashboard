import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin, type AppDispatch } from "../app/features/loginSlice";
import { Navigate } from "react-router-dom";
interface ILogin {
  identifier: string;
  password: string;
}
interface IProps {
  isAuthenticated: boolean;
}
 import { useNavigate } from "react-router-dom";
const Login = ({ isAuthenticated }: IProps) => {


 const dispatch = useDispatch<AppDispatch>();
const { loading } = useSelector(selectLogin);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [user, setUser] = useState<ILogin>({
    identifier: "",
    password: "",
  });
 

const navigate = useNavigate();

  const bgPage = useColorModeValue("gray.50", "gray.800");
const bgCard = useColorModeValue("white", "gray.700");

  // Handler
  const onsubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if  (!user.identifier || !user.password) {
      setIsEmail(true);

      if (!user.password) {
        setIsPassword(true);
      }
  

      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
    setTimeout(() => {
        navigate("/");
      }, 1000);
  };

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

    if (isAuthenticated) {
      return <Navigate to="/"  replace/>
    }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgPage}
    >
      <Box
        as="form"
        w="full"
        maxW="md"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        bg={bgCard}
        onSubmit={onsubmitHandler}
      >
        <Heading mb={6} textAlign="center">
          Sign in
        </Heading>

        <Stack spacing={4}>
          {/* Email */}
          <FormControl  isInvalid={isEmail}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
             
              value={user.identifier}
              name="identifier"
              placeholder="Enter your email"
              onChange={ChangeHandler}
            />
            {isEmail ? (
              <FormHelperText color="red.500">email is required</FormHelperText>
            ) : null}
          </FormControl>

          {/* Password */}
          <FormControl  isInvalid={isPassword}>
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={user.password}
                name="password"
                onChange={ChangeHandler}
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isPassword ? (
              <FormHelperText color="red.500">
                password is required
              </FormHelperText>
            ) : null}
          </FormControl>

          {/* Remember me + Forgot */}
          <Stack direction="row" justify="space-between" align="center">
            <Checkbox>Remember me</Checkbox>

            <Link color="purple.500" fontSize="sm">
              Forgot password?
            </Link>
          </Stack>

          {/* Submit */}
          
          <Button colorScheme="purple" width="full"  bg={isEmail || isPassword ? "red.500" : "purple.500"}
          _hover={{ bg: isEmail || isPassword ? "red.600" : "purple.600" }}
            isLoading={loading}
            type="submit"
          >
            Sign in
          </Button>

          <Text textAlign="center" fontSize="sm">
            Don’t have an account? <Link color="purple.500">Sign up</Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
