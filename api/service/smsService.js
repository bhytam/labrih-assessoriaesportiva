var request = require("request-json");
var url = require("url");

var SmsService = {

    sendSms: function (sms) {
        return new Promise(function(success, error) {
           success({success: true});
        })
    }
}

module.exports = SmsService;