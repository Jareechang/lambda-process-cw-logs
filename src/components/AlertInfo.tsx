import {
    JSXSlack,
    Fragment,
    //Blocks,
    Section,
    Image,
    Divider,
    Context,
    Actions,
    Button
} from '@speee-js/jsx-slack'

import * as utils from './AlertInfo.utils';
import * as types from './types';

interface ImageOptions {
    src: string;
    alt: string;
}

export type AlertType = 'warn' | 'error' | 'ok';
 
interface Props {
    /**
     * Title of the alert
     * */
    title: string;

    /**
     * Description of the alert
     * */
    description: string;

    /**
     * type of the alert
     * */
    type: AlertType; 

    /**
     * Image 
     * */
    image: ImageOptions;

    /*
     * Call to action for the alert
     * **/
    buttonUrl: string;

    logDetails?: types.LogDetails;
}

const defaultProps : Props = {
    title: '',
    description: '',
    type: 'ok',
    image: {
        src: '',
        alt: ''
    },
    buttonUrl: '',
};

export const AlertInfo = (
    props: Props = defaultProps 
) => {
    const {
        title,
        description,
        type,
        image,
        buttonUrl,
        logDetails
    } = props;

    return (
        <Fragment>
            <Section>
                <b>Title:</b> {title || ''}<br />
                <b>Date:</b> {utils.getCurrentDate()}<br />
                <b>Description:</b> {description || ''}<br />
                <b>Group:</b> {logDetails ? logDetails.group : 'N/A'}<br />
                <b>Events:</b> {logDetails ? logDetails.events : 'N/A'}<br />
                <b>Filters:</b> {logDetails? logDetails.filters : 'N/A'}<br />
                <Image
                    src={image.src}
                    alt={image.alt}
                />
            </Section>
            <Divider />
            <Context>{utils.getEmoji(type)} - <b>{utils.getAlertContextMessage(type)}</b></Context>
            <Actions>
            {/* Attach link to s3 archived error logs */}
                <Button url={buttonUrl}>View logs</Button>
            </Actions>
        </Fragment>
    );
}
