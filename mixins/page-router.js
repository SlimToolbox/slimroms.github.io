pageRouter = {
    init: function () {
        this.on('mount', function() {
            if (this._route_path != undefined || !this.root.hasAttribute('route-path')) return;
            this.trigger('page-router-configure');
            this._route_path = this.root.getAttribute('route-path');
            if (this.parent && this.parent._route_path != undefined) {
                if (this._route_path.startsWith('/') && this.parent._route_path.endsWith('/')) {
                    this._route_path = this._route_path.slice(1);
                }
                this._route_path = this.parent._route_path + this._route_path;
            }
            this._route_previous_display = this.root.style.display;
            this.root.style.display = "none";

            var that = this;
            riot.route(this._route_path, function() {
                route_to_page(that);
            });
            this.trigger('page-router-configured');
        });
        this.on('updated', function() {
            this.trigger('page-router-children-load');
            this._route_child_tags = [];
            for (var child_tag_type in this.tags) {
                var child_tag_category = this.tags[child_tag_type];
                for (var child_tag_i in child_tag_category) {
                    var c = child_tag_category[child_tag_i];
                    if (c && c._route_path) this._route_child_tags.push(c);
                }
            }
            this.trigger('page-router-children-loaded');
        });
    },
    displayRoute: function() {
        this.trigger('page-router-display');
        if (this.parent && this.parent._route_path != undefined) this.parent.displayRoute();
        this.root.style.display = this._route_previous_display;
        this.trigger('page-router-displayed');
    },
    hideRoute: function() {
        this.trigger('page-router-hide');
        for (var c_i in this._route_child_tags) {
            this._route_child_tags[c_i].hideRoute();
        }
        this.root.style.display = "none";
        this.trigger('page-router-hidden');
    }
};
