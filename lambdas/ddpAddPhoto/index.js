'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 *
 event = {
        userId,
        photoNum,
        lat,
        lng
    }
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Construct the photo item
    // Save it to the ddpPhotoLog table

    // When querying for pictures, the whole range for each user will
    // be retrieved.
    var photo = {
        userId : "" + event.userId,
        addedOn : Date.now(),
        photoNum : parseInt(event.photoNum),
        lat : parseFloat(event.lat),
        lng : parseFloat(event.lng)
    }

    dynamo.putItem({
        "Item" : photo,
        "TableName" : "ddpPhoto"
    }, function(err) {
        var baseURL = "https://s3-us-west-2.amazonaws.com/party-revolution/" + photo.userId + "/img" + photo.photoNum;
        var res = {
            ok : true,
            fullSize : baseURL + ".jpg",
            thumb : baseURL + "-thumb.jpg",
            lat : photo.lat,
            lng : photo.lng,
            userId : photo.userId
        }
        if (err) {
            console.log(err); res.ok = false;
        }
        callback(err, res)
    })

};