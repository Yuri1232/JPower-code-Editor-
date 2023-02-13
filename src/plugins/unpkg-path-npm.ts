import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const esbuildCache = localforage.createInstance({
  name: "esbulidCache",
});

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" }; //entry point index.js
        }
        if (args.path.includes("./") || args.path.includes("../")) {
          // nested path
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        } else {
          return {
            path: `https://unpkg.com/${args.path}`, // regular path
            namespace: "a",
          };
        }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: ` 
              import message from 'react-dom';
              console.log(message);
            `,
          };
        }
        const getkeyStore = await esbuildCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (getkeyStore) {
          return getkeyStore;
        }
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
