import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activitiy: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}
export default function ActivityDetails({ activitiy, cancelSelectActivity, openForm }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activitiy.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activitiy.title}</Card.Header>
                <Card.Meta>
                    <span>{activitiy.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activitiy.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activitiy.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}