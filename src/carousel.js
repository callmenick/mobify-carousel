$(document).ready(function() {
  
  /**
   * Carousel
   *
   * @constructor
   * @description The Carousel superclass.
   * @param {Object} options The options hash
   */
  var Carousel = function(options) {
    this.$el = $(options.el);
    this.imageUrls = options.imageCollection;
    this.imageCollection = [];
    this.navDotsCollection = [];
    this.currentIndex = 0;
    this._init();
  };

  /**
   * Carousel.prototype._init
   *
   * @description The initializer for the carousel. Gets called after
   *   instantiation. Returns nothing.
   */
  Carousel.prototype._init = function() {
    // set up containers
    this.$imageContainer = $('<div></div>').addClass('carousel-images');
    this.$navigation = $('<ul></ul>').addClass('carousel-navigation');
    this.$arrows = $('<ul></ul>').addClass('carousel-arrows');

    // loop over images and build up containers
    jQuery.each(this.imageUrls, function(index, value) {
      this.$imageContainer.append(this._buildImage(index, value));
      this.$navigation.append(this._buildDot(index));
    }.bind(this));

    // build arrows
    this.$arrows.append(this._buildArrow('prev'));
    this.$arrows.append(this._buildArrow('next'));
    this.$imageContainer.append(this.$arrows);

    // append containers to master container
    this.$el.append(this.$imageContainer);
    this.$el.append(this.$navigation);
  };

  /**
   * Carousel.prototype._buildImage
   *
   * @description Builds up and image to append to the carousel.
   * @param {Number} index The index value of the image
   * @param {String} value The string url of the image
   * @return {HTMLElement} The image
   */
  Carousel.prototype._buildImage = function(index, value) {
    var $img = $('<img>').attr('src', value).addClass('carousel-images__image');
    if (index === 0) { $img.addClass('is-active'); }
    this.$imageContainer.append($img);
    this.imageCollection.push($img);

    return $img;
  };

  /**
   * Carousel.prototype._buildDot
   *
   * @description Builds up a dot for the dotted navigation, and registers event
   *   listeners on it.
   * @param {Number} index The index value of the dot
   * @return {HTMLElement} The dot
   */
  Carousel.prototype._buildDot = function(index) {
    var $item = $('<li></li>').addClass('carousel-navigation__item');
    var $btn = $('<a></a>').html(index).addClass('carousel-navigation__btn');
    if (index === 0) { $btn.addClass('is-active'); }
    $item.html($btn);
    this.navDotsCollection.push($btn);
    this._initDotEvents($btn, index);

    return $item;
  };

  /**
   * Carousel.prototype._buildArrow
   *
   * @description Builds up an arrow for prev and next clicking.
   * @param {String} type Either prev or next for the arrow placement
   * @return {HTMLElement} The arrow
   */
  Carousel.prototype._buildArrow = function(type) {
    var $arrow = $('<li></li>').addClass('carousel-arrows__arrow carousel-arrows__arrow--' + type);
    var $btn = $('<a></a>').html(type).addClass('carousel-arrows__btn');
    $arrow.html($btn);
    this._initArrowEvents($btn, type);

    return $arrow;
  };

  /**
   * Carousel.prototype._initDotEvents
   *
   * @description Initializes events on the dots. Returns nothing.
   * @param {HTMLElement} dot The dot to listen on
   * @param {Number} index The index value of the dot
   */
  Carousel.prototype._initDotEvents = function(dot, index) {
    dot.on('click', function(e) {
      e.preventDefault();
      if (index !== this.currentIndex) { this.goToSlide(index); }
    }.bind(this));
  };

  /**
   * Carousel.prototype._initArrowEvents
   *
   * @description Initializes events on the arrows. Returns nothing.
   * @param {HTMLElement} btn The arrow to listen on
   * @param {String} type The type of arrow
   */
  Carousel.prototype._initArrowEvents = function(btn, type) {
    btn.on('click', function(e) {
      e.preventDefault();

      if (type === 'prev') { this.goToPrevious(); }
      if (type === 'next') { this.goToNext(); }
    }.bind(this));
  };

  /**
   * Carousel.prototype.goToPrevious
   *
   * @description Goes to the previous slide. Returns nothing.
   */
  Carousel.prototype.goToPrevious = function() {
    if (this.currentIndex !== 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  };

  /**
   * Carousel.prototype.goToNext
   *
   * @description Goes to the next slide. Returns nothing.
   */
  Carousel.prototype.goToNext = function() {
    if (this.currentIndex !== this.imageCollection.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  };

  /**
   * Carousel.prototype.goToSlide
   *
   * @description Goes to a particular slide based on index value. This changes
   *   the current index, the image, and the dot navigation. Returns nothing.
   * @param {Number} index The index value to go to
   */
  Carousel.prototype.goToSlide = function(index) {
    // change the dot
    this.navDotsCollection[this.currentIndex].removeClass('is-active');
    this.navDotsCollection[index].addClass('is-active');

    // change the image
    this.imageCollection[this.currentIndex].removeClass('is-active');
    this.imageCollection[index].addClass('is-active');

    // update current index
    this.currentIndex = index;
  };

  /**
   * myCarousel
   *
   * @description Creates a new instance of Carousel.
   * @type {Carousel}
   */
  var myCarousel = new Carousel({
    el: '#carousel',
    imageCollection: [
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg',
      'img/4.jpg'
    ]
  });

});