export interface LogDetails {
    /*
     * Number of error log events observed
     * */
    events: number;
    /*
     * the log group
     *
     * **/
    group: string;
    /*
     * The filter which the log group is grepping by
     * **/
    filters: string;
}
