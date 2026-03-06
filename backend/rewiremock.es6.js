import rewiremock from "rewiremock/node.js";

// Essential to ensure ESM/TS support and to let rewiremock know the test entry point
rewiremock.overrideEntryPoint(import.meta.url);

export { rewiremock };
