({
    handleSave: function(component, event, helper) {
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var fullName = firstName + " " + lastName;
        component.set("v.fullName", fullName);

        var action = component.get("c.saveContact");
        action.setParams({
            firstName: firstName,
            lastName: lastName
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var contactId = response.getReturnValue();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": 'Contact ' + fullName + ' has been created with Id: ' + contactId,
                    "type": "success"
                });
                toastEvent.fire();
            } else if (state === "ERROR") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": 'Failed to create contact ' + fullName,
                    "type": "error"
                });
                toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
    }
})