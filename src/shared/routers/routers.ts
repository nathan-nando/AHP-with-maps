import {createBrowserRouter} from "react-router-dom";
import {Calculates} from "../../features/Calculates/Calculates";
import {Alternatives} from "../../features/Alternatives/Alternatives";
import {Root} from "../../features/Root/view/Root";
import {Criteria} from "../../features/Criteria/view/Criteria";
import {Dashboard} from "../../features/Dashboard/view/Dashboard";
import {Collections} from "../../features/Collections/view/Collections";
import {FinalScores} from "../../features/FinalScores/view/FinalScores";

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
