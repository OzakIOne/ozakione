import { writeFileSync } from "fs";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

async function build() {
  const source = await Bun.file("./src/resume.mdx").text();

  const { default: Content } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
    development: false,
  });

  const ReactDOMServer = await import("react-dom/server");
  const html = ReactDOMServer.renderToStaticMarkup(Content({}));

  writeFileSync("README.md", html);
}

build();
