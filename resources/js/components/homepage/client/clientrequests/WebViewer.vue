<template>
  <div>
    <div>
      <button id="prev">Previous</button>
      <button id="next">Next</button>
      &nbsp; &nbsp;
      <span
        >Page: <span id="page_num"></span> / <span id="page_count"></span
      ></span>
    </div>

    <canvas id="the-canvas"></canvas>
    <div class="textLayer"></div>
  </div>
</template>
<script>
export default {
  props: ["docs"],
  data() {
    return {
      file: null,
    };
  },
  computed: {
    getPdf() {
      return this.docs;
    },
  },
  methods: {
    setPdvViewer() {
      document.addEventListener('contextmenu', event => event.preventDefault());
      var url = this.getPdf.filecontent;

      // Loaded via <script> tag, create shortcut to access PDF.js exports.
      var pdfjsLib = window["pdfjs-dist/build/pdf"];

      // The workerSrc property shall be specified.
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "//mozilla.github.io/pdf.js/build/pdf.worker.js";

      var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        //scale = 0.8,
        scale = 2,
        canvas = document.getElementById("the-canvas"),
        textLayer = document.querySelector(".textLayer"),
        ctx = canvas.getContext("2d");

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      function renderPage(num) {
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport({ scale: scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          var displayWidth = 2;
          canvas.style.width = `${(viewport.width * displayWidth) / scale}px`;
          canvas.style.height = `${(viewport.height * displayWidth) / scale}px`;
          textLayer.style.width = `${
            (viewport.width * displayWidth) / scale
          }px`;
          textLayer.style.height = `${
            (viewport.height * displayWidth) / scale
          }px`;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);

          // Wait for rendering to finish
          renderTask.promise
            .then(function () {
              pageRendering = false;
              if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
              }
            })
            .then(function () {
              // Returns a promise, on resolving it will return text contents of the page
              return page.getTextContent();
            })
            .then(function (textContent) {
              // Assign CSS to the textLayer elemen

              textLayer.style.left = canvas.offsetLeft + "px";
              textLayer.style.top = canvas.offsetTop + "px";
              textLayer.style.height = canvas.offsetHeight + "px";
              textLayer.style.width = canvas.offsetWidth + "px";

              // Pass the data to the method for rendering of text over the pdf canvas.
              pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayer,
                viewport: viewport,
                textDivs: [],
              });
            });
        });

        // Update page counters
        document.getElementById("page_num").textContent = num;
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      function queueRenderPage(num) {
        if (pageRendering) {
          pageNumPending = num;
        } else {
          renderPage(num);
        }
      }

      /**
       * Displays previous page.
       */
      function onPrevPage() {
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
      }
      document.getElementById("prev").addEventListener("click", onPrevPage);

      /**
       * Displays next page.
       */
      function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
      }
      document.getElementById("next").addEventListener("click", onNextPage);

      /**
       * Asynchronously downloads PDF.
       */
      pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById("page_count").textContent = pdfDoc.numPages;

        // Initial/first page rendering
        renderPage(pageNum);
      });
    },
  },
  mounted() {
    this.setPdvViewer();
  },
};
</script>
<style scoped>
#the-canvas {
  direction: ltr;
}
</style>