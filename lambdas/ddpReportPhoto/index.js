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

    /*
     "ConditionExpression" : "photoNum = :num",
     */

    var updateSpec = {
        "TableName" : "ddpPhoto",
        "Key" : { "userId" : ""+event.userId, "addedOn" : parseInt(event.addedOn) },
        "UpdateExpression" : "set flagged = :flag",
        "ExpressionAttributeValues": {
            ":flag": 1
        },
    };

    dynamo.updateItem(updateSpec,
        function (err, data) {
            var ok = true;
            if (err) {
                console.log("Error")
                console.log(err);
            } else {
                console.log("Success")
            }
            callback(err, {ok:!err})
        }
    );
};