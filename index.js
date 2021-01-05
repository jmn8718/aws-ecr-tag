const core = require("@actions/core");
const AWS = require("aws-sdk");
const { tagEcrImage } = require("./src/tagEcrImage");

const run = async function () {
  try {
    const accessKeyId = core.getInput("access_key_id");
    const secretAccessKey = core.getInput("secret_access_key");
    const region = core.getInput("region");
    const ecrRepository = core.getInput("ecr_repository");
    const ecrTag = core.getInput("ecr_tag");
    const tag = core.getInput("tag");

    core.debug("Initializing aws client with parameters: ");
    core.debug({
      accessKeyId,
      secretAccessKey,
      region,
    });
    core.debug({ ecrRepository, ecrTag, tag });
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      region,
    });

    const ecr = new AWS.ECR({ apiVersion: "2015-09-21" });
    const digest = await tagEcrImage(ecr, { ecrRepository, ecrTag, tag });
    core.setOutput("digest", digest);
  } catch (error) {
    console.log(error);
    core.debug(error);
    // core.setFailed(error.message);
  }
};

run();
