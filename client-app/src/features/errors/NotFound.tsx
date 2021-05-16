import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                <p>We couldn't find what you are looking for :(</p>
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary content='Return to activities' />
            </Segment.Inline>
        </Segment>
    )
}