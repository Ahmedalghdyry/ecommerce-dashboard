import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import InternetProvider from "./provider/InternetProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
      <InternetProvider>
    <ChakraProvider>
            <App />
    </ChakraProvider>
      </InternetProvider>
          </Provider>
        </QueryClientProvider>
);
