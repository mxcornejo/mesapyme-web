import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function configurarNext(fase) {
  return {
    distDir: fase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    output: "standalone",
    outputFileTracingRoot: process.cwd(),
  };
}
