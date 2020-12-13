import zlib from 'zlib';

import {
    CloudWatchLogsEvent
} from 'aws-lambda';

export const isValidCwLogEvent = (
    event: CloudWatchLogsEvent
): boolean => {
    return !!(
        event
        && event.awslogs
        && event.awslogs.data
    );
}

export const processLogs = (
    event: CloudWatchLogsEvent
) : any => {
    if (isValidCwLogEvent(event)) {
        try {
            const payload = Buffer.from(event.awslogs.data, 'base64');
            const data = JSON.parse(zlib.unzipSync(payload).toString());
            return data;
        } catch (ex) {
            console.error(
                `[ERROR] processLogs() -> Failed to process the log event, ex: ${ex}`
            );
        }
    }
    return event;
}
