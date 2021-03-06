define(["joshlib!ui/list","joshlib!utils/dollar","joshlib!vendor/underscore"], function(UIList,$,_) {

  var UIToolbar = UIList.extend({

    initialize: function(options) {
      UIList.prototype.initialize.call(this, options);

      this.minLengthToShow = options.minLengthToShow;

      this.active = -1;
    },

    generate: function(cb) {
      if (this.collection &&
          (this.minLengthToShow > 0) &&
          (this.collection.length < this.minLengthToShow)) {
        // TODO: NO! A view MUST NOT touch DOM content that it did not create
        $('body').addClass('no-toolbar');
      }
      UIList.prototype.generate.call(this,cb);
    },

    navFocus: function(origin, event) {
      UIList.prototype.navFocus.call(this, origin, event);

      if(!event && this.active === -1 && this.collection.length) {
        this.activate(0);
      }
    },

    navDown: function() {
      if(this.collection.length) {
        this.activate(Math.min(this.active + 1, this.collection.length - 1));
      }
    },

    navUp: function() {
      if(this.collection.length) {
        this.activate(Math.max(this.active - 1, 0));
      }
    },

    navAction: function() {
      if(this.origin && this.origin.navRight) {
        this.origin.navRight();
      }
    },

    activate: function(num) {
      if(num !== this.active) {
        this.$('.nav-active').removeClass('nav-active');

        var $item = $(this.items[num].$el);

        $item.addClass('nav-active');

        var $link = $item.find('a');

        if($link.length) {
          window.location = $link.attr('href');
        }

        this.active = num;
      }
    }

  });

  return UIToolbar;
});