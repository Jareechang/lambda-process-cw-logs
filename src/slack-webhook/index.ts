import axios, {AxiosResponse, AxiosError} from 'axios';
import * as t from '../types';

/*
 *
 * SlackWebhook class to handle sending of messages to slack
 *
 * Enviroments vars: 
 * 
 * SLACK_MS_DEBUG - Use Debug mode on the slack webhook api calls (additional logging for debuggin)
 *
 *
 * Example:
 *
 * const slackWebhook = new SlackWebhook(<slack-webhook-endpoint> || '');
 *
 * const blocks = (
 *      JSXSlack(<MyComponent />)
 * );
 *
 * await slackWebhook.sendMessage({
 *      channel: <my-channel>,
 *      blocks
 * });
 *
 *
 * **/
export class SlackWebhook implements t.SlackWebhook {
    private endpoint : string;
    private debug : boolean = false;

    public constructor(endpoint: string) {
        this.endpoint = endpoint;

        if (process.env.SLACK_MS_DEBUG) {
           this.setDebugMode();
        }
    }

    /**
     *
     * Set debug mode to enable logging 
     *
     * */
    public setDebugMode() : void {
        this.debug = true;
    }

    /**
     *
     * Send a slack webhook message
     *
     * @param data - the message params sent to slack {@link SlackMessageParam}
     *
     * @see (Slack api ref)[https://api.slack.com/methods/chat.postMessage#text_usage]
     *
     * */
    public async sendMessage(
        data: t.SlackMessageParam
    ): Promise<void> {
        this.log(`sent data ${data}`);
        const config = {};
        try {
            const response = await axios.post(this.endpoint, data, config);
            this.handleSuccess(response);
        } catch(err) {
            this.handleError(err);
        }
    }

    /**
     *
     * Handles the success of the api call 
     *
     * @param response - the response from axios (from slack webhook)
     *
     * */
    private handleSuccess(
        response: AxiosResponse
    ): void {
        this.log(`webhook sent, data: ${response.data}`);
    }

    /**
     *
     * Handles the error of the api call 
     *
     * @param response - the error from axios (from slack webhook)
     *
     * */
    private handleError(
        err: AxiosError
    ): void {
        const response = err.response || {
            status: null,
            data: {}
        };
        this.log(response);
        this.log(`Failed to sent webhook, status: ${response.status} ,info: ${response.data}`, 'error');
    }

    /**
     *
     * Abstract logger function controls whether to log pending debug flag
     *
     * @param content - content of to be logged 
     * @param level - log level (console.info, console.error etc), defaults to console.log
     *
     * */
    private log(
        content: any,
        level: string = ''
    ): void {
        const _log = ({
            info: console.info,
            error: console.error,
        })[level] || console.log;
        if (this.debug) {
            _log(content);
        }
    }
}
