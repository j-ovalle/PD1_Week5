import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactCards extends LightningElement {
    contacts;
    wiredContactResult;

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactResult = result;
        if (result.data) {
            this.contacts = result.data;
        } else if (result.error) {
            console.error('Error fetching contacts:', result.error);
        }
    }

    // Handle refresh button click to refresh the data
    handleRefresh() {
        return refreshApex(this.wiredContactResult);
    }
}
