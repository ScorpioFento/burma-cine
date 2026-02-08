import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../layout/MainLayout";
import Movie from "../pages/Movie";
import type { ReactNode } from "react";
import Detail from "../pages/Detail";

export interface RouteItem {
  path : string;
  element : ReactNode;
  children? : RouteItem[];
}

export const routes : RouteItem[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "movies", element: <Movie /> },
      { path : "detail/:id", element: <Detail /> },
      { path: "about", element: <About /> },
    ],
  },
];
