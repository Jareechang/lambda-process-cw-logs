export function getEmoji(type: string): string {
    return ({
        'warn': ':warning:',
        'error': ':x:',
        'ok': ':white_check_mark:'
    })[type] || '';
}

export function getAlertContextMessage(type: string): string {
    return ({
        'warn': 'Warning alert received.',
        'error': 'Error Alert received.',
        'ok': 'Ok Alert Received'
    })[type] || '';
}

export function getCurrentDate() : string {
    return (new Date()).toDateString();
}
