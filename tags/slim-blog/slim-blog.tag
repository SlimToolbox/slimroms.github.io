<slim-blog>
  <div each={ posts }>
    <div class="mdl-card mdl-shadow--2dp">
      <div class="mdl-card__media mdl-color-text--grey-50">
        <h3>{ title }</h3>
      </div>
    </div>
    <h1>{ title }</h1>
    <h3>{ date }</h3>
    <slim-marked content={ content }></slim-marked>
  </div>

  <style scoped>
    .mdl-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 360px;
    }
    .mdl-card__media {
      box-sizing: border-box;
      background-size: cover;
      padding: 24px;
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      align-items: flex-end;
      cursor: pointer;
    }

  </style>

  <script>
    this.mixin('page-router');
    this.posts = [];
    this.on('mount', function() {
      var self = this;
      load_posts().then(function(posts) {
        self.posts = posts;
        self.update();
      });
    });
  </script>
</slim-blog>
