'use strict';
console.log('Loading function');

let https = require('https');
let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 {
     userIds : [1,2,3]
 }
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:');
    console.log(event)
    console.log('Received context:');
    console.log(context)
    getJSON({
        host: 'graph.facebook.com',
        path: '/v2.7/picture?ids=' + event.userIds.join(",") + '&redirect=false&access_token=TODO_FACEBOOK_ACCESS_TOKEN_GOES_HERE',
        method: 'GET',
    }, function(err, statusCode, json) {
        callback(err, json);
    });
};


function getJSON(options, onResult)
{
    var req = https.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(null, res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        onResult(err, null);
    });

    req.end();
};