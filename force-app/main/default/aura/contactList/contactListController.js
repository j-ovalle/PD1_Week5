({
    removeContact: function(component, event, helper) {
        var index = event.getSource().get("v.value");
        var removeContactEvent = component.getEvent("removeContactEvent");
        removeContactEvent.setParams({ "index": index });
        removeContactEvent.fire();
    }
})