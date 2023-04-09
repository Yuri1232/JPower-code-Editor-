import { unpkgPathPlugin } from "./plugins/unpkg-path-npm";
import { load_plugin } from "./plugins/load-plugin";
import * as esbuild from "esbuild-wasm";

let service: esbuild.Service;
export default async (stringCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  }
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), load_plugin(stringCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    });
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (error: any) {
    return {
      code: "",
      err: error ? error.message : "",
    };
  }
};
