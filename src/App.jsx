import {
  AvicenaPage,
  DeffiPage,
  NajmyPage,
  Homepage,
  NotFoundPage,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/avicena",
      element: <AvicenaPage />,
    },
    {
      path: "/deffi",
      element: <DeffiPage />,
    },
    {
      path: "/najmy",
      element: <NajmyPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
