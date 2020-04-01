// creation de la méthode gis (met les textes en gras, italic et surligné)

(function ($) {

    $.fn.gis = function () {
        this.each(function () {
            $(this).wrap('<strong><i><u></u></u></i></strong>');
        });
        return this;
    };

})(jQuery);