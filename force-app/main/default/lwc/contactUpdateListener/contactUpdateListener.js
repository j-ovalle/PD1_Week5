import { LightningElement, track } from 'lwc';
import { subscribe, onError } from 'lightning/empApi';

export default class ContactUpdateListener extends LightningElement {
    @track eventMessages = [];

    connectedCallback() {
        // Subscribe to platform event
        const channelName = '/event/Contact_Update__e';
        subscribe(channelName, -1, (eventReceived) => {
            const message = eventReceived.data.payload.Message__c;
            this.eventMessages.push({ message });
        });
        // Handle errors
        onError((error) => {
            console.error('Error with platform event:', error);
        });
    }
}
