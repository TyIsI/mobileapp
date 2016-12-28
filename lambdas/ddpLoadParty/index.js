'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 *  {
 *      beaconId : ###      // the party beacon that unites the party
 *  }
 */
exports.handler = (event, context, callback) => {

    // TODO: Load nearby

    var spec = {
        "TableName" : "ddpParty",

        "KeyConditionExpression" : "beaconId = :beaconId",
        "ExpressionAttributeValues" : {
            ":beaconId" : parseInt(event.beaconId)
        },
        "Limit" : 500
    }
    dynamo.query(spec, function(err, data) {
        if (err) {
            console.error(err)
            callback("An error occurred")
        } else {
            callback(null, {users:data.Items})
        }
    });
};