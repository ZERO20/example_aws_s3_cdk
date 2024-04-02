import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { S3BucketConstruct } from './constructs/s3-construct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ExampleAwsS3CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here

        // example resource
        // const queue = new sqs.Queue(this, 'ExampleAwsS3CdkQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });

        // Create Custom S3 Bucket
        new S3BucketConstruct(this, 'MyCustomBucketS3Cdk', {
            bucketName: 'example-bucket-s3-cdk',
            objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
        });
    }
}
