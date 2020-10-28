// Create the class for link objects
class LinkObject {
  constructor(name, url) {
      this.name = name;
      this.url = url;
  }
}
class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  createLinkObjectHtml(name, href) {
      var a = document.createElement('a');
      var linkText = document.createTextNode(name);
      a.appendChild(linkText);
      a.title = name;
      a.href = href;
      return a;
  }
  
  async element(element) {
    var anchor = "<a href=\"{href}\">{title}</a>";
    var anchorList = [];
    linkObjects.forEach(function (item, index) {
      anchorList.push(anchor.replace("{href}", item.url).replace("{title}", item.name))
    });
    element.setInnerContent(anchorList, { 'html': true })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

var linkObjects = new Array(new LinkObject("A sample URL", "https://asampleurl.com"), 
                            new LinkObject("Another sample URL", "https://anothersampleurl.com"),
                            new LinkObject("A final sample URL", "https://afinalsampleurl.com"));

async function handleRequest(request) {
  if (request.url.includes("/links")) {
    return new Response(JSON.stringify(linkObjects), {
      headers: { 'content-type': 'application/json' },
  })
  } else {
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    const responseHtml = await fetch("https://static-links-page.signalnerve.workers.dev", init);
    return new HTMLRewriter().on(`div[id=links]`, new LinksTransformer()).transform(responseHtml)
  }
    
}
