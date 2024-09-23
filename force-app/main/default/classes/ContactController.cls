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

            for (Map<String, String> contactMap : contactList) {
                Contact con = new Contact();
                con.FirstName = contactMap.get('firstName');
                con.LastName = contactMap.get('lastName');
                contactsToInsert.add(con);
            }

            if (!contactsToInsert.isEmpty()) {
                insert contactsToInsert;
            }
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while saving the Contacts');
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT 
                Id, 
                FirstName, 
                LastName, 
                Email 
            FROM Contact
            WHERE Email != null
            LIMIT 15
        ];
    }    
}
