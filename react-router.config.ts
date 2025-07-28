import { Config } from "@react-router/dev/config"

export default {
  ssr: false,
  /**
   * ISSUE: PRE-RENDERING a 404 PAGE only maps to pre-defined "unknown" paths on 'prerender:' below
   * even with a * wildcard set on routes.ts (e.g. Only /404 will appropriately load a 404 PAGE, 
   * while /any-other-undefined-paths will cause a 'No result found for routeId path/to/404page' error)
   */
 
  prerender: ["/", "/404"],
  // prerender: async ({ getStaticPaths }) => {
  //   console.log(getStaticPaths())
  //   return [...getStaticPaths()]
  // },
  appDirectory: "src/"
} satisfies Config