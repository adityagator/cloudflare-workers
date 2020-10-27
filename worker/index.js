// Create the class for link objects
class LinkObject {
  constructor(name, url) {
      this.name = name;
      this.url = url;
  }
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

var linkObjects = new Array(new LinkObject("testName1", "testUrl1"), 
                            new LinkObject("testName2", "testUrl2"),
                            new LinkObject("testName3", "testUrl3"));
async function handleRequest(request) {
  if (request.url.includes("/links"))
    return new Response(JSON.stringify(linkObjects), {
      headers: { 'content-type': 'application/json' },
  })
}
