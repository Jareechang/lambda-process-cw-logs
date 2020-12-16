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
}

const images = {
    thisIsFineSrc: (
        'https://i.ibb.co/rkV4YT6/6ccede86e8a11d520f5e7a3386d46ff0-jill-stein-the-election.jpg'
    )
};

export const Alert = (props: Props) => {
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
            />
        </Blocks>
    );

}
