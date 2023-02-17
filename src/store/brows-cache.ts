import localforage from "localforage";

export const esbuildCache = localforage.createInstance({
  name: "esbulidCache",
});
