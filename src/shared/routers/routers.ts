import {createBrowserRouter} from "react-router-dom";
import {Root} from "../../features/Root/Root";
import {Criteria} from "../../features/Criteria/Criteria";
import {FinalScores} from "../../features/FinalScores/FinalScores";
import {Calculates} from "../../features/Calculates/Calculates";
import {Alternatives} from "../../features/Alternatives/Alternatives";
import {Collections} from "../../features/Collections/Collections";
import {Dashboard} from "../../features/Dashboard/Dashboard";

export const routers = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/dashboard", Component: Dashboard},
      { path: "/criteria", Component: Criteria},
      { path: "/collections", Component: Collections},
      { path: "/alternatives", Component: Alternatives},
      { path: "/calculates", Component: Calculates},
      { path: "/final-scores", Component: FinalScores},
    ],
  },
]);
