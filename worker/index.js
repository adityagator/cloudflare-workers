class LinkObject {
  constructor(name, url) {
      this.name = name;
      this.url = url;
  }
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
var linkObjects = new Array(new LinkObject("testName1", "testUrl1"), 
                            new LinkObject("testName2", "testUrl2"));
async function handleRequest(request) {
  return new Response(JSON.stringify(linkObjects), {
    headers: { 'content-type': 'application/json' },
  })
}
