import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, type RouteItem } from "./routes/routes";
import { useEffect, useState } from "react";
import IntroLoading from "./components/IntroLoading/IntroLoading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function renderRoutes(routeList: RouteItem[]) {
    return routeList.map((r) => (
      <Route path={r.path} element={r.element} key={r.path}>
        {r.children && renderRoutes(r.children)}
      </Route>
    ));
  }

  if (isLoading) {
    return <IntroLoading />;
  }

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}