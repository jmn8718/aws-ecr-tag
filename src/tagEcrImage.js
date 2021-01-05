const core = require("@actions/core");

const getImage = async function(ecr, repositoryName, imageTag) {
  const image = await ecr
    .batchGetImage({
      repositoryName,
      imageIds: [{ imageTag }],
    })
    .promise();

  return image ? image.images[0] : undefined;
};

const tagEcrImage = async function(ecr, parameters = {}) {
  const { ecrRepository, ecrTag, tag } = parameters;
  core.debug("ECR parameters:");
  core.debug(parameters);

  // TODO validate that current tag does not exists already
  const newTagImage = await getImage(ecr, ecrRepository, tag);
  const existingTagImage = await getImage(ecr, ecrRepository, ecrTag);

  // check that image digest is different
  if (
    newTagImage &&
    newTagImage.imageId.imageDigest === existingTagImage.imageId.imageDigest
  ) {
    core.info(
      `Image with tag: ${tag} already is tagged. DIGEST = ${newTagImage.imageId.imageDigest}`
    );
    return newTagImage.imageId.imageDigest;
  }

  const result = await ecr
    .putImage({
      repositoryName: ecrRepository,
      imageTag: tag,
      imageManifest: existingTagImage.imageManifest,
    })
    .promise();

  return result.image.imageId.imageDigest;
};

module.exports = {
  tagEcrImage,
};
