import { readdir, writeFile, readFile } from "node:fs/promises";
import { join as joinPath } from "node:path";

const sourceDir = joinPath(process.cwd(), "src");

const filePaths = await getFilePaths();
const pathsContents = await Promise.all(filePaths.sort().map(getFileContent));
const exports = pathsContents.map(extractExports);
const reexports = exports.map(formatExports);

await writeFile(joinPath(sourceDir, "index.ts"), reexports.join("\n"));

async function getFilePaths() {
  const paths = await readdir(sourceDir, {
    recursive: true,
  });
  return paths.filter(
    (path) =>
      path.endsWith(".ts") && !path.endsWith(".spec.ts") && path !== "index.ts"
  );
}

async function getFileContent(path) {
  return {
    path,
    content: await readFile(joinPath(sourceDir, path), { encoding: "utf8" }),
  };
}

function formatExports({ path, exports }) {
  return `export { ${exports
    .map(({ type, id }) => (type === "type" ? `type ${id}` : id))
    .join(", ")} } from './${path.replace(/\.ts$/, "").replace(/\\/g, "/")}';`;
}

function extractExports({ path, content }) {
  const exports = [];
  const runtimeExports = [
    ...content.matchAll(/export\s+const\s+(\S+)/g),
    ...content.matchAll(/export\s+async\s+function\s+([^\s(<]+)/g),
    ...content.matchAll(/export\s+function\s+([^\s(<]+)/g),
    ...content.matchAll(/export\s+class\s+([^\s<{]+)/g),
  ].map(([, id]) => ({ type: "runtime", id }));
  const typeExports = [
    ...content.matchAll(/export\s+type\s+(\S+)\s+=/g),
    ...content.matchAll(/export\s+interface\s+([^\s{<]+)/g),
  ].map(([, id]) => ({ type: "type", id }));
  return {
    path,
    exports: removeDuplicates([...runtimeExports, ...typeExports]),
  };
}

function removeDuplicates(arr) {
  const map = new Map();
  for (const val of arr) {
    map.set(val.id, val);
  }
  return Array.from(map.values());
}
