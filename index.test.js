const process = require("process");
const cp = require("child_process");
const path = require("path");

test("tag image", () => {
  process.env["INPUT_ACCESS_KEY_ID"] = "INPUT_ACCESS_KEY_ID";
  process.env["INPUT_SECRET_ACCESS_KEY"] = "INPUT_SECRET_ACCESS_KEY";
  process.env["INPUT_REGION"] = "us-west-1";
  process.env["INPUT_ECR_REPOSITORY"] = "api";
  process.env["INPUT_ECR_TAG"] = "develop";
  process.env["INPUT_TAG"] = "test";

  const ip = path.join(__dirname, "index.js");
  console.log(cp.execSync(`node ${ip}`, { env: process.env }).toString());
});
