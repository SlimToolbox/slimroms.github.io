<slim-blog>
  <div each={ posts } class="mdl-grid">
    <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-color--grey-100">
      <div class="mdl-card__title mdl-color-text--grey-50 mdl-color--blue-grey-500">
        <h2 class="mdl-card__title-text">{ title }</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <slim-marked content={ content }></slim-marked>
      </div>
      <div class="mdl-card__actions">
        <h6>{ date }</h6>
      </div>
    </div>
  </div>

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
