({
    handleAddContact: function(component, event, helper) {
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var newContact = {
            'firstName': firstName,
            'lastName': lastName,
            'fullName': firstName + " " + lastName
        };
        // Add the new contact to the list
        var contacts = component.get("v.contacts");
        contacts.push(newContact);
        component.set("v.contacts", contacts);
        // Clear the input fields
        component.set("v.firstName", "");
        component.set("v.lastName", "");
    },
    
    handleSaveAll: function(component, event, helper) {
        var contacts = component.get("v.contacts");
        var action = component.get("c.saveAllContacts");
        action.setParams({
            contactList: contacts
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "All contacts have been saved successfully.",
                    "type": "success"
                });
                toastEvent.fire();
                // Clear the contact list
                component.set("v.contacts", []);
            } else if (state === "ERROR") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Failed to save contacts.",
                    "type": "error"
                });
                toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
    },
    
    handleRemoveContact: function(component, event, helper) {
        var index = event.getParam("index");
        var contacts = component.get("v.contacts");
        // Remove the contact from the list
        contacts.splice(index, 1);
        component.set("v.contacts", contacts);
    }
})