import AWS from 'aws-sdk';

import {
    mapSecretNames,
    getAppSecrets
} from './aws-ssm';

jest.mock('aws-sdk');

import * as mockData from './samples';

describe('AWS ssm app wrapper', () => {
    const getParametersByPathMock = {
        promise: async() => {
            return mockData.getParametersByPath
        }
    };

    beforeEach(() => {
        // @ts-ignore
        AWS.SSM.mockImplementation(() => {
            return {
                getParametersByPath: () => getParametersByPathMock
            };
        });
    });

    it('should fetch the proper secret', async() => {
        const secrets = await getAppSecrets('/dev/application/slack_webhook/url');
        expect(secrets).toEqual({
            slack_url: mockData.getParametersByPath.Parameters[0].Value
        });
    });
});

describe('mapSecretNames()', () => {
    it('should properly return the correct mapping for secrets', () => {
        expect(mapSecretNames(
            mockData.getParametersByPath
        )).toMatchSnapshot();
    });
});
