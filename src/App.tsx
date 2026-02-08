import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, type RouteItem } from "./routes/routes";
import IntroLoading from "./components/IntroLoading/IntroLoading";
import { useAppLoading } from "./hooks/useAppLoading";

export default function App() {
  // const isLoading = useAppLoading();

  function renderRoutes(routeList: RouteItem[]) {
    return routeList.map((r) => (
      <Route path={r.path} element={r.element} key={r.path}>
        {r.children && renderRoutes(r.children)}
      </Route>
    ));
  }

  // if (isLoading) {
  //   return <IntroLoading />;
  // }

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
