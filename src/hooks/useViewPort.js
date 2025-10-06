import { useContext } from "react";
import { viewportContext } from "../providers/viewport.provider";

export const useViewport = () => {
  const { width, height, mobile } = useContext(viewportContext);
  return { width, height, mobile };
};
