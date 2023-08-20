window.onload = (event) => {
    var lazyloads = document.querySelectorAll('[data-src]');

    for (var i=0;i<lazyloads.length;i++) {
      lazyloads[i].src = lazyloads[i].getAttribute("data-src");
      console.log("loaded lazy element: " + lazyloads[i].src);
    }
};