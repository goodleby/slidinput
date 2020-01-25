'use strict';
(function($) {
  const getClassesString = (classList, postfix = '') =>
    Array.from(classList)
      .map(item => item + postfix)
      .join(' ');
  const pxToNum = (...values) =>
    values.reduce((acc, item) => acc + Number(item.slice(0, -2)), 0);
  const compareStyle = (style, target1, target2) =>
    $(target1).css(style) !== $(target2).css(style) ? $(target1).css(style) : '';
  const defs = {};
  $.fn.slidinput = function(options) {
    options = $.extend(defs, options);
    return this.each(function() {
      $(this).wrap(
        $(document.createElement('label')).addClass(
          getClassesString(['slidinput', ...this.classList], '-wrapper')
        )
      );
      const $wrapper = $(this).parent();
      const $placeholder = $(document.createElement('span'))
        .addClass('slidinput-placeholder')
        .text($(this).attr('placeholder'));
      $wrapper.append($placeholder).css({
        marginLeft: compareStyle('marginLeft', this, $wrapper),
        marginTop: compareStyle('marginTop', this, $wrapper),
        marginRight: compareStyle('marginRight', this, $wrapper),
        marginBottom: compareStyle('marginBottom', this, $wrapper)
      });
      $(this)
        .removeAttr('placeholder')
        .css({
          margin: 0
        })
        .on('focus', () => $wrapper.addClass('focused'))
        .on('blur', () => $wrapper.removeClass('focused'))
        .on('input', () => {
          $(this)
            .val()
            .trim()
            ? $wrapper.addClass('filled')
            : $wrapper.removeClass('filled');
        });
      $placeholder.css({
        color: compareStyle('color', this, $placeholder),
        fontSize: compareStyle('fontSize', this, $placeholder),
        fontFamily: compareStyle('fontFamily', this, $placeholder),
        letterSpacing: compareStyle('letterSpacing', this, $placeholder),
        fontWeight: compareStyle('fontWeight', this, $placeholder),
        top: 0,
        left: 0
      });
      let placeholderTop = ($wrapper.outerHeight() - $placeholder.height()) / 2;
      let placeholderLeft = pxToNum(
        $(this).css('borderLeftWidth'),
        $(this).css('paddingLeft')
      );
      $placeholder.css({
        top: placeholderTop,
        left: placeholderLeft
      });
    });
  };
})(jQuery);
