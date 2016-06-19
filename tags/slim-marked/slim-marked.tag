<slim-marked>

  <script>
    "use strict";
    this.on('mount', function() {
      this.root.innerHTML = marked(opts.content);
    });
  </script>

</slim-marked>
