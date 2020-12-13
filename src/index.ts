import {
    Context,
    CloudWatchLogsEvent
} from 'aws-lambda';

exports.handler = async function(
    event: CloudWatchLogsEvent,
    context: Context 
) {
    console.log('TODO');
}
