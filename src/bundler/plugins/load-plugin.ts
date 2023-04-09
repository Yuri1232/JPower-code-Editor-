import axios from "axios";
import * as esbulid from "esbuild-wasm";
import { esbuildCache } from "../../store/brows-cache";

export const load_plugin = (code: string) => {
  return {
    name: "unpkg-path-npm",
    setup(build: esbulid.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: code,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const getkeyStore = await esbuildCache.getItem<esbulid.OnLoadResult>(
          args.path
        );
        if (getkeyStore) {
          return getkeyStore;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        // Trick esbuild => if the import is CSS then .css otherwise jsx
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
         element.innerText = '${escaped}'
         document.head.appendChild(element);
        `;
        const result: esbulid.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await esbuildCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        // Trick esbuild => if the import is CSS then .css otherwise jsx
        const result: esbulid.OnLoadResult = {
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
