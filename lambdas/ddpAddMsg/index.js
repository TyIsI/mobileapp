'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {

    var spec = {
        "TableName" : "ddpChat",
        "Item" : {
            "partyId" : ""+ (event.partyId || 0),
            "addedOn" : Date.now(),
            "userId" : ""+event.userId,
            "msg" : event.msg
        }
    }
    dynamo.putItem(spec, function(err, data) {
        if (err) {
            console.error(err)
            callback("An error occurred")
        } else {
            callback(null, {ok:true})
        }

    });
};