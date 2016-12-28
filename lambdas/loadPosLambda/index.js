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

    var params = {
        TableName : "ddpUser",
//        IndexName : "p1-time-index",
//        KeyConditionExpression: "p1 = :part",
//        ExpressionAttributeNames:{
//            "#t": "time"
//        },
//        ExpressionAttributeValues: {
//            ":time": ""+Date.now() - 72*3600*1000,
//            ":part": 0
//        },
        "ConsistentRead" : true
    };
    dynamo.scan(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        console.log(data);
        data.Items.forEach(function(val) {
            delete val.email
            delete val.accessToken
            delete val.lastName
            delete val.p1
            delete val.time
        })
        callback(null,{items:data.Items})
    })
};