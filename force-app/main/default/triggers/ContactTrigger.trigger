trigger ContactTrigger on Contact (after update) {
    for (Contact updatedContact : Trigger.new) {
        Contact_Update__e platformEvent = new Contact_Update__e(
            ContactId__c = updatedContact.Id,
            Message__c = 'Contact ' + updatedContact.FirstName + ' ' + updatedContact.LastName + ' was updated.'
        );
        EventBus.publish(platformEvent);
    }
}