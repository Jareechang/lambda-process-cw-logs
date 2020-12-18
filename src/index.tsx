/** @jsx JSXSlack.h **/
import { JSXSlack } from '@speee-js/jsx-slack'

import {
    Context,
    CloudWatchLogsEvent
} from 'aws-lambda';

import { processLogs } from './process-log';
import { SlackWebhook } from './slack-webhook';
import { Alert } from './components';
import { getAppSecrets } from './app-secrets';

exports.logLambda = async function(
    event: CloudWatchLogsEvent,
    context: Context 
) {
    console.error('ERROR: This is an error');
}

exports.processLambdaErrorLog = async function(
    event: CloudWatchLogsEvent,
    context: Context 
) {
    const processedLogs = processLogs(event);
    console.log('[DONE] processed: ', JSON.stringify(processedLogs, null, 2));

    const {
        logEvents,
        logGroup
    } = processedLogs;

    const {
        slack_url
    } = await getAppSecrets(
        '/dev/application/slack_webhook'
    );

    const slackWebhook = new SlackWebhook(
        slack_url
        || process.env.SLACK_MS_WEBHOOK_ENDPOINT
        || ''
    );

    // Create message
    const blocks = (
        JSXSlack(
            <Alert 
                type="error"
                title="Logging Alert"
                subtitle="Lambda - Processed error logs"
                description={
                    `Received error logs from foo service, logGroup: ${logGroup}, events: ${logEvents.length} `
                }
                buttonUrl="TODO"
            />
        )
    );

    // Send message
    await slackWebhook.sendMessage({
        channel: process.env.SLACK_MS_CHANNEL || '',
        text: 'some text',
        blocks
    });
}

exports.sendWebhook = async function() {
    const slackWebhook = new SlackWebhook(
        process.env.SLACK_MS_WEBHOOK_ENDPOINT || ''
    );

    // Create message
    const blocks = (
        JSXSlack(
            <Alert 
                type="error"
                title="Logging Alert"
                subtitle="[Lambda - Processed error logs]"
                description="Received error logs from foo service"
                buttonUrl="TODO"
            />
        )
    );

    // Send message
    await slackWebhook.sendMessage({
        channel: process.env.SLACK_MS_CHANNEL || '',
        text: 'some text',
        blocks
    });
}
