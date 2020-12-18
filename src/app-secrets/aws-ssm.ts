import AWS from 'aws-sdk';
import * as types from './types';

const ssm = new AWS.SSM({
    apiVersion: '2014-11-06'
});

export const getAppSecrets = async(
    // The base of the ssm param path
    baseSecretPath: string,
    /*
     * AWS SSM options
     *
     * url: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#getParametersByPath-property
     *
     * **/
    ssmOptions?: any
): Promise<types.AppSecrets | null> => {
  let ApplicationParams : any = null;
    try {
        ApplicationParams = await ssm.getParametersByPath({
                Path: baseSecretPath,
                Recursive: true,
                WithDecryption: true
            },
        ).promise();
    } catch (ex) {
        console.error(
            `Failed to fetch Parameters from System Manager Parameter Store, ex: ${ex}`
        )
    }
    return ApplicationParams;
}
