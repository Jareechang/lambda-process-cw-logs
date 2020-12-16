export interface SlackMessageParam {
    channel: string;
    text: string;
    blocks?: any;
}

export interface SlackWebhook {
    /**
     *
     * Set debug mode to enable logging 
     * */
    setDebugMode(): void;

    /**
     *
     * Send a slack webhook message
     *
     * @param data - the message params sent to slack {@link SlackMessageParam}
     *
     * @see (Slack api ref)[https://api.slack.com/methods/chat.postMessage#text_usage]
     *
     * */
    sendMessage(data: SlackMessageParam) : Promise<void>;
}
