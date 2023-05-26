import {createBrowserRouter} from "react-router-dom";
import {Root} from "../../features/Root/Root";
import {OtherPages} from "../../features/OtherPages/OtherPages";

export const routers = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "other-pages", Component: OtherPages },
    ],
  },
]);
