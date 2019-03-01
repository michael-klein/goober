import { add, flush, extractCss } from "../sheet";

describe("sheet", () => {
  describe("add", () => {
    beforeEach(() => {
      if (global.document.head.firstChild) {
        global.document.head.removeChild(global.document.head.firstChild);
      }
    });

    afterAll(() => {
      // Empty out the cache
      flush();
    });

    it("should add css", () => {
      // Add a 'css' rule
      add("one", global.document.head);

      // Same hash, should not be twice
      add("one", global.document.head);

      const sheet = global.document.head.firstChild;

      expect(sheet.hasAttribute("data-goober")).toEqual(true);

      expect(sheet.innerHTML).toEqual("one");

      add("two", global.document.head);

      expect(sheet.innerHTML).toEqual("onetwo");
    });

    it("should not create the sheet on server-side", () => {
      const bkp = global.document;
      delete global.document;

      // Should not throw
      expect(() => add("ssr")).not.toThrow();

      global.document = bkp;
    });
  });

  it("should extract CSS", () => {
    add("flush");
    expect(extractCss()).toEqual("<style data-goober>flush</style>");
    expect(extractCss()).toEqual("<style data-goober></style>");
  });
});
