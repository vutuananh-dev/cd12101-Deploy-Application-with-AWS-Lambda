import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as AWSXRay from 'aws-xray-sdk-core'

const s3Client = AWSXRay.captureAWSv3Client(new S3Client({}))
const s3BucketName = process.env.TODOS_S3_BUCKET

function generateAttachmentPresignedUrl(todoId) {
  return `https://${s3BucketName}.s3.amazonaws.com/${todoId}`
}

async function getUploadUrl(todoId: string) {
  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: todoId,
  })
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  })
  return url
}

export { generateAttachmentPresignedUrl, getUploadUrl }
