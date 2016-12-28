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

    var spec = {
        "TableName" : "ddpChat",
        "KeyConditionExpression" : "partyId = :partyId AND addedOn > :addedOn",
        "ExpressionAttributeValues" : {
            ":partyId" : "" + (event.partyId || 0),
            ":addedOn" : parseInt(event.addedOn || new Date(2016,0).getTime())
        },
        "Limit" : 100
    }
    dynamo.query(spec, function(err, data) {
        if (err) {
            console.error(err)
            callback("An error occurred")
        } else {
            callback(null, {msgs : data.Items})
        }
    });
};