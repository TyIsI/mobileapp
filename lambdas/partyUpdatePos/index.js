'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // TODO check access token
    var item = {
        userId : ""+event.userId,
        lat : parseFloat(event.lat),
        lng : parseFloat(event.lng),
        time : Date.now()
    }
    console.log("Saving item for userId " + event.userId);
    console.dir(item);
    saveItem(item)


};


function updateBeacon(item) {
    var params = {
        TableName:"ddpPartyBeacon",
        Key: {
            "beaconId" : 0
        },
        UpdateExpression: "set lat = :lat, lng=:lng",
        ExpressionAttributeValues:{
            ":lat" :item.lat,
            ":lng" :item.lng
        }
    };

    console.log("Update for beacon")
    dynamo.updateItem(params, function(err) {
        var ok = true;
        if (err) { console.log(err); ok = false }
    });
}

function saveItem(item) {

    var params = {
        TableName:"ddpUser",
        Key: {
            "userId" : item.userId
        },
        UpdateExpression: "set lat = :lat, lng=:lng, #t=:t",
        ExpressionAttributeNames:{
            "#t" : "time"
        },
        ExpressionAttributeValues:{
            ":lat" :item.lat,
            ":lng" :item.lng,
            ":t"   :Date.now()
        }
    };

    console.log("Update for user")
    dynamo.updateItem(params, function(err) {
        var ok = true;
        if (err) { console.log(err); ok = false }
        // callback(null, {"ok":ok})
        if (""+item.userId == "10100228349445587") { // -11111) { // "10154238546536397") {
            updateBeacon(item)
        }


    });



    console.log("Update for ddpUserPosLog")
    dynamo.putItem({
        "Item" : item,
        "TableName" : "ddpUserPosLog"
    }, function(err) {
        var ok = true;
        if (err) { console.log(err); ok = false }
        // callback(null, {"ok":ok})
    });
}
