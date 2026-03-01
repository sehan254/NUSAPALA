import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import MountainList from "./pages/MountainList";
import MountainDetail from "./pages/MountainDetail";
import AIAdvisor from "./pages/AIAdvisor";
import GPSTracking from "./pages/GPSTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "gunung", Component: MountainList },
      { path: "gunung/:id", Component: MountainDetail },
      { path: "ai-advisor", Component: AIAdvisor },
      { path: "gps-tracking", Component: GPSTracking },
      { path: "*", Component: Home },
    ],
  },
], {
  basename: "/"
});
