import { parse } from "../parse";

describe("parse", () => {

    it("regression", () => {
        const hash = ".hash";
        const parsed = parse(hash, `
            display: block;
            &.nested {
                color: white;
            }

            button {
                foo: baz;
            }

            @keyframe name {
                0% {
                    width: 0;
                }
                100% {
                    width: calc(100%);
                }
            }
            @media screen and (no-idea: valpx) {
                display: block;
                #red {
                    color: red;
                }
            }
        `);

        expect(parsed).toEqual([
            ".hash { display: block; }",
            ".hash.nested { color: white; }",
            ".hash button { foo: baz; }",
            "@keyframe name { 0% { width: 0; } 100% { width: calc(100%); } }",
            "@media screen and (no-idea: valpx) { .hash { display: block; } .hash #red { color: red; } }"
        ].join("\n"));
    })

});