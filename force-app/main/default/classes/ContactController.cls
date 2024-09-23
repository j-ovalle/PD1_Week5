public class ContactController {
    @AuraEnabled
    public static Id saveContact(String firstName, String lastName) {
        try {
            Contact con = new Contact(
                FirstName = firstName,
                LastName = lastName
            );
            insert con;
            return con.Id;
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while saving the Contact');
        }
    }

    @AuraEnabled
    public static void saveAllContacts(List<Map<String, String>> contactList) {
        try {
            List<Contact> contactsToInsert = new List<Contact>();

            // Iterate over the contact list and create new Contact records
            for (Map<String, String> contactMap : contactList) {
                Contact newContact = new Contact();
                newContact.FirstName = contactMap.get('firstName');
                newContact.LastName = contactMap.get('lastName');
                contactsToInsert.add(newContact);
            }

            if (!contactsToInsert.isEmpty()) {
                insert contactsToInsert;
            }
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while saving the Contacts');
        }
    }
}
