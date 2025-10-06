import { pxToRem } from "./pxToRem.js";

describe("converts px values to rem", () => {
    it("converts number type to rem", () => {
        const rem = pxToRem(20);
        expect(rem).toEqual("1.25rem");
    })

    it("converts string type to rem", () => {
        const rem = pxToRem("20px");
        expect(rem).toEqual("1.25rem");
    })


})
