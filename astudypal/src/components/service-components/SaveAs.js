import React from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

const SaveAs = ({ setSaveAsFunction }) => {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h4">Save As</Popover.Header>
            <Popover.Body>
                <FaGoogleDrive onClick={e => setSaveAsFunction(e, "Google Drive")}/>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success" style={{display: 'block', width: '100%'}}>Save As</Button>
        </OverlayTrigger>
    )
}

export const ExportFile = () => {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Export</Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant='danger' style={{display: 'block', width: '100%'}}>Export</Button>
        </OverlayTrigger>
    )
}

export default SaveAs;
