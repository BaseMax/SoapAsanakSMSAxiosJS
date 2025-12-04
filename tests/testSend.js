const AsanakSms = require("../lib/AsanakSms");

(async () => {
  const sms = new AsanakSms({});
  
  try {
    const response = await sms.send("989121111010", "سلام - این یک پیام تست است");
    console.log(response);
    console.log("Response received successfully!");
  } catch (err) {
    console.error("Failed to send SMS:", err.message);
  }
})();
