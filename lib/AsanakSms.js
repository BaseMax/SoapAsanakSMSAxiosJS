const axios = require("axios");

class AsanakSms {
  constructor({ username, password, srcAddress, debug = false } = {}) {
    this.username = username || process.env.ASANAK_USERNAME;
    this.password = password || process.env.ASANAK_PASSWORD;
    this.srcAddress = srcAddress || process.env.ASANAK_SOURCE_NUMBER;
    this.url =
      process.env.ASANAK_WEBSERVICE ||
      "https://smsapi.asanak.ir/services/CompositeSmsGateway?wsdl";
    this.debug = debug;
  }

  buildXml(destAddress, message) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:ns1="http://webService.compositeSmsGateway.services.sdp.peykasa.com/">
  <SOAP-ENV:Body>
    <ns1:sendSms>
      <userCredential>
        <password>${this.password}</password>
        <username>${this.username}</username>
      </userCredential>
      <srcAddresses>${this.srcAddress}</srcAddresses>
      <destAddresses>${destAddress}</destAddresses>
      <msgBody>${message}</msgBody>
      <msgEncoding>8</msgEncoding>
    </ns1:sendSms>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
  }

  async send(destAddress, message) {
    const xml = this.buildXml(destAddress, message);

    if (this.debug) {
      console.log("======== RAW REQUEST XML ========\n", xml);
    }

    try {
      const response = await axios({
        url: this.url,
        method: "POST",
        data: xml,
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": "",
        },
        timeout: 20000,
        decompress: true, // Important! Asanak returns compressed responses sometimes
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      if (this.debug) {
        console.log("\n======== RAW RESPONSE HEADERS ========\n", response.headers);
        console.log("\n======== RAW RESPONSE XML ========\n", response.data);
      }

      return response.data;
    } catch (err) {
      if (this.debug) {
        console.error("\n========= SOAP ERROR =========");
        console.error(err?.response?.data || err.message);
      }
      throw err;
    }
  }
}

module.exports = AsanakSms;
