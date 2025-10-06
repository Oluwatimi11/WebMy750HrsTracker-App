export const pxToRem = (px) => {
    let _px = "";
  
    if (typeof px !== "number") {
      _px = px.replace(/\D/g, "");
    } else _px = px;
    return `${+_px / 16}rem`;
  };
  