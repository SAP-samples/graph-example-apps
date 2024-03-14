using {sap.graph.demo as demo} from '../db/schema';

service AccountService @(path: '/graph-demo'){

    @readonly
    @requires: 'authenticated-user'
    entity LoyaltyAccount as
        select from demo.LoyaltyFlyerAccount {
            userId,
            loyaltyProgramName,
            loyaltyProgramStatusId,
            loyaltyPoints,
            isMarkedForArchiving
        };

    @readonly
    @requires: 'authenticated-user'
    entity LoyaltyStatus as
        select from demo.LoyaltyStatus {
            statusId,
            statusName,
            statusCode
        };
}
