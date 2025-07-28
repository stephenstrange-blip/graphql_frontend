import { route, index, layout, type RouteConfig } from "@react-router/dev/routes"

export default [
  index("pages/Home.tsx"),
  
  //Play.tsx is like a default header style
  layout("pages/Play.tsx", [
    //"Game.tsx is the main body"
    route("play", "pages/Game.tsx")
  ]),

  route("*","pages/CatchAll.tsx")

] satisfies RouteConfig;


// /home & / -> Root.tsx