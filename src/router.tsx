import { createBrowserRouter } from "react-router";
import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import QuizForm from "./pages/QuizForm";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "create", Component: QuizForm },
      { path: "edit/:id", Component: QuizForm },
      { path: "history", Component: Dashboard },
    ],
  },
]);
