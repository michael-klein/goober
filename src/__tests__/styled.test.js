import { styled } from "../styled";
import { getCss } from "../core/parser/get-css";
import { getClassNameForCss } from "../core/style/get-class-name";

jest.mock("../core/style/get-class-name", () => ({
  getClassNameForCss: jest.fn().mockReturnValue("getClassNameForCss")
}));

jest.mock("../core/parser/get-css", () => ({
  getCss: jest.fn().mockReturnValue("getCss")
}));

describe("styled", () => {
  it("should return the className for vanilla", () => {
    const vanilla = styled("")`css`;

    expect(getCss).toHaveBeenCalledWith(["css"], [], undefined);
    expect(getClassNameForCss).toHaveBeenCalledWith("getCss", document.head);

    expect(vanilla).toEqual("getClassNameForCss");
  });

  it("should use the target that is bound to styled", () => {
    const s = styled.bind({ target: document.body });
    s("tag")`css`({});
    expect(getCss).toHaveBeenCalledWith(["css"], [], undefined);
    expect(getClassNameForCss).toHaveBeenCalledWith("getCss", document.body);
  });

  it("should not call the pragma if not bound to styled", () => {
    const output = styled("tag")`css`({});

    expect(typeof output).toEqual("string");
  });

  it("should call the pragma if bound to styled", () => {
    const fn = jest.fn();
    const s = styled.bind({ h: fn });

    s("tag")`css`({});
    expect(fn).toBeCalled();
  });
});
