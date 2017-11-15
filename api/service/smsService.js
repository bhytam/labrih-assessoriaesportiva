var soap = require('soap');

var SmsService = {

    sendSms: function (smsMessage) {
        var args = {
            User: "85999981112",
            Pwd: "753272",
            SmsMessage: {
                Subject: "Runner - " + smsMessage.Number,
                Msg: smsMessage.Message,
                Destinations: [{
                    Destination: {
                        Number: smsMessage.Number
                    }
                }]
            }
        };

        soap.createClient('http://54.173.24.177/painel/ServiceSms.asmx?wsdl',
            function (err, client) {
                client.SendSMS(args, function (err, result) {
                    console.log(result);
                });
            });
    }
}

module.exports = SmsService;