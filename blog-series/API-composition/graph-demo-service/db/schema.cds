using { managed } from '@sap/cds/common';

namespace sap.graph.demo;

entity LoyaltyFlyerAccount : managed {
    key userId : String(10);
    loyaltyProgramName: String(10);
    loyaltyProgramStatusId: Integer;
    loyaltyPoints: Integer;
    isMarkedForArchiving: Boolean;
}


entity LoyaltyStatus : managed {
    key statusId : Integer;
    statusName: String(100);
    statusCode: String(3);
    pointsRequired: Integer;
}
