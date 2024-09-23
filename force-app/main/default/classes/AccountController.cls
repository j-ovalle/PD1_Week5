public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [
            SELECT 
                Id, 
                Name, 
                Industry, 
                Phone 
            FROM Account 
            LIMIT 50
        ];
    }
}