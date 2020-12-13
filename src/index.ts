import {
    Context,
    CloudWatchLogsEvent
} from 'aws-lambda';

import { processLogs } from './process-log';

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
}
