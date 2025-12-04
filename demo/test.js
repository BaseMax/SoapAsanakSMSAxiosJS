const AsanakSms = require("soap-asanak-sms");

const sms = new AsanakSms({ username: "", password: "", srcAddress: "", baseurl: "https://smsapi.asanak.ir/services/CompositeSmsGateway?wsdl", debug: false, });

(async () => {
  await sms.send("989121111010", "سلام - این یک پیام تست از npm package");
})();
