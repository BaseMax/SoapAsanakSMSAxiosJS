const axios = require("axios");

async function sendSms() {
  const url = "https://smsapi.asanak.ir/services/CompositeSmsGateway?wsdl";
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:ns1="http://webService.compositeSmsGateway.services.sdp.peykasa.com/">
  <SOAP-ENV:Body>
    <ns1:sendSms>
      <userCredential>
        <password>xxxxxxx</password>
        <username>xxxxxxx</username>
      </userCredential>
      <srcAddresses>xxxxxxx</srcAddresses>
      <destAddresses>xxxxxxx</destAddresses>
      <msgBody>xxxxxxx</msgBody>
      <msgEncoding>8</msgEncoding>
    </ns1:sendSms>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

  try {
    const response = await axios.post(url, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": ""
      },
      decompress: true,
      timeout: 20000
    });

    console.log("======== RAW REQUEST XML ========\n", xml);
    console.log("\n======== RAW RESPONSE HEADERS ========\n", response.headers);
    console.log("\n======== RAW RESPONSE XML ========\n", response.data);

  } catch (err) {
    console.error("\n========= SOAP ERROR =========");
    console.error(err.response?.data || err.message);
  }
}

sendSms();
