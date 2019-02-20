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
    });



    it("cra", () => {
        const hash = ".App";
        const parsed = parse(hash, `
            text-align: center;
          
          .logo {
            animation: App-logo-spin infinite 20s linear;
            height: 40vmin;
            pointer-events: none;
          }
          
          .header {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }
          
          .link {
            color: #61dafb;
          }
          
          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `);

        expect(parsed).toEqual([
            ".App { text-align: center; }",
            ".App .logo { animation: App-logo-spin infinite 20s linear;height: 40vmin;pointer-events: none; }",
            ".App .header { background-color: #282c34;min-height: 100vh;display: flex;flex-direction: column;align-items: center;justify-content: center;font-size: calc(10px + 2vmin);color: white; }",
            ".App .link { color: #61dafb; }",
            "@keyframes App-logo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"
        ].join("\n"));
    });

});