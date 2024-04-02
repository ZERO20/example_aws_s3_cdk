import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface S3BucketProps {
    readonly bucketName: string;
    readonly objectOwnership?: s3.ObjectOwnership;
    readonly blockPublicAccess?: s3.BlockPublicAccess;
    readonly encryptionKey?: kms.IKey;
}

export class S3BucketConstruct extends Construct {
    public readonly bucket: s3.Bucket;

    constructor(scope: Construct, id: string, props: S3BucketProps) {
        super(scope, id);

        // Destructure props
        const { bucketName, objectOwnership, blockPublicAccess, encryptionKey } = props;

        // Create S3 Bucket
        this.bucket = new s3.Bucket(this, id, {
            bucketName: bucketName,
            objectOwnership: objectOwnership || s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            blockPublicAccess: blockPublicAccess || s3.BlockPublicAccess.BLOCK_ALL,
            encryptionKey,
        });

        // Grant read access to the bucket
        this.bucket.grantRead(new iam.AccountRootPrincipal());
    }
}
