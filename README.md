# ECR Image tag javascript action

This action get an image with tag *ecr_tag* and add the new tag *tag*

## Inputs

### `access_key_id`

**Required** AWS access key id.

### `access_key_id`

**Required** AWS secret access key.

### `region`

**Required** AWS Region.

### `ecr_repository`

**Required** ECR repository.

### `ecr_tag`

**Required** ECR tag of image to use as a base to tag.

### `tag`

**Required** New tag to add to the image.

## Outputs

### `digest`

The tagged image digest

## Example usage

```yml
- name: Tag ECR Image with new tag
  uses: jmn8718/aws-ecr-tag@v1
  id: tag-image
  with:
    access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    region: ${{ secrets.REGION }}
    ecr_repository: ${{ secrets.ECR_REPOSITORY }}
    ecr_tag: "develop"
    tag: "test"
# Use the output from the `tag-image` step
- name: Get the output digest
  run: echo "Image Tagged Digest => ${{ steps.tag-image.outputs.digest }}"
```
## References

- https://github.com/actions/javascript-action