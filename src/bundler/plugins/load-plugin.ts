import axios from "axios";
import * as esbuild from "esbuild-wasm";
import { esbuildCache } from "../../store/brows-cache";

export const load_plugin = (code: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: code,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await esbuildCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await esbuildCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await esbuildCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
