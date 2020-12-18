import {
    JSXSlack,
    Section,
    Divider,
    Blocks,
} from '@speee-js/jsx-slack'

import {
    AlertInfo,
    AlertType
} from './AlertInfo';

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

interface Props {
    /*
     * Alert type
     *
     * **/
    type: AlertType
    /*
     * Main Title of alert
     *
     * **/
    title: string;

    /*
     * sub Title of alert
     *
     * **/
    subtitle: string;

    /*
     *
     * Description of the alert
     * **/
    description: string;
    
    /*
     *  call to action url for the button
     * **/
    buttonUrl: string;

    /*
     * More details about the log
     *
     * **/
    logDetails?: LogDetails;
}

const images = {
    thisIsFineSrc: (
        'https://i.ibb.co/rkV4YT6/6ccede86e8a11d520f5e7a3386d46ff0-jill-stein-the-election.jpg'
    )
};

export const Alert = (props: Props) => {
    const {logDetails} = props;
    return (
        <Blocks>
            <Section><b>{props.title}</b></Section>
            <Divider />
            <AlertInfo
                type={props.type}
                title={props.subtitle}
                description={props.description}
                image={{
                    //src: 'https://placekitten.com/500/500',
                    src: images.thisIsFineSrc, 
                    alt: 'this is fine...'
                }}
                buttonUrl={props.buttonUrl}
            />
            {logDetails && (
                <Section>
                    <b>Details:</b> {logDetails.group} / {logDetails.events}  / {logDetails.filters}
                </Section>
            )}
        </Blocks>
    );
}
