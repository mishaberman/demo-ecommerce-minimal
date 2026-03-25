const bizSdk = require("facebook-nodejs-business-sdk");
const crypto = require("crypto");

const accessToken = process.env.META_ACCESS_TOKEN;
const pixelId = process.env.META_PIXEL_ID;

const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;

const sendCapiEvent = (eventName, eventData) => {
  if (!accessToken || !pixelId) {
    console.error("Meta CAPI credentials not configured.");
    return;
  }

  const api = bizSdk.FacebookAdsApi.init(accessToken);

  const { userData, customData, eventSourceUrl, eventTime, eventId } = eventData;

  const normalizedUserData = {
    client_ip_address: userData.client_ip_address,
    client_user_agent: userData.client_user_agent,
    fbp: userData.fbp,
    fbc: userData.fbc,
    em: userData.email ? crypto.createHash("sha256").update(userData.email).digest("hex") : undefined,
    ph: userData.phone ? crypto.createHash("sha256").update(userData.phone).digest("hex") : undefined,
    fn: userData.firstName ? crypto.createHash("sha256").update(userData.firstName).digest("hex") : undefined,
    ln: userData.lastName ? crypto.createHash("sha256").update(userData.lastName).digest("hex") : undefined,
  };

  const serverEvent = new ServerEvent()
    .eventName(eventName)
    .eventTime(eventTime || Math.floor(Date.now() / 1000))
    .eventSourceUrl(eventSourceUrl)
    .userData(new UserData(normalizedUserData))
    .customData(customData)
    .eventId(eventId) // For deduplication
    .actionSource("website");

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(pixelId, eventsData);

  eventRequest.execute().then(
    response => {
      console.log(`CAPI event ${eventName} sent successfully:`, response);
    },
    err => {
      console.error(`Error sending CAPI event ${eventName}:`, err);
    }
  );
};

module.exports = { sendCapiEvent };
