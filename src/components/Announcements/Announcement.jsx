import React from 'react';
import '../../scss/components/announcements/announcement.scss';

export class Announcement extends React.Component {

    render() {
        const { errorCodes } = this.props;

        if (errorCodes === false) {
            return null;
        }

        return (
            <div className={'announcement'}>
                {this.props.children}
            </div>
        );
    }
}
