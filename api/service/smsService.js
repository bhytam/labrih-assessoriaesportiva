var soap = require('soap');

var SmsService = {

    sendSms: function (smsMessage) {
        var args = {
            User: process.env.SMS_USER,
            Pwd: process.env.SMS_PWD,
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

        return new Promise(function (sucesso, erro) {
            soap.createClient('http://54.173.24.177/painel/ServiceSms.asmx?wsdl',
                function (err, client) {
                    if (err) erro(err);
                    client.SendSMS(args, function (err, result) {
                        if (err) erro(err);
                        sucesso(sucesso);
                    });
                });
        });
    }
}

module.exports = SmsService;