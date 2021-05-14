import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {

    const [target, setTarget] = useState("");
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                                <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleDeleteActivity(e, activity.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                ))}
            </Item.Group>

        </Segment>
    )
})