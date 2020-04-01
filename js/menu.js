const PictimeMenu = (function($) {
    return class Menu {
        constructor() {
            $(document).ready(() => this.init());
        }
        init() {
            this.$menu = $('.menu');
            this.addEventListener();
        }
        addEventListener() {
            this.$menu.on('click', '.menu__toggle,.menu__close,.menu__overlay', () => this.onClickToggleMenu());
            this.$menu.on('click', '.menu__show-more', (e) => this.onClickToggleIcon(e, true));
            this.$menu.on('click', '.menu__show-less',(e) => this.onClickToggleIcon(e, false));
            this.$menu.on('mouseout', '.menu__univers-title', (e) => this.onMouseOutItem(e));
            this.$menu.on('click', '.menu__univers-title', (e) => this.onClickTitleUnivers(e));
            this.$menu.on('click', '.new-search-button', (e) => this.openSearch(e))
        }
        onMouseOutItem(event) {
            let $elm = $(event.currentTarget);
            $elm
                .removeClass('clicked')
                .removeClass('clickedTouch');
        }
        onClickTitleUnivers(event) {
            let $elm = $(event.currentTarget);
            if(this.havePointer()) {
                $elm.toggleClass('clicked');
            }
            if(!this.havePointer() && this.isTouchScreen()) {
                if(!$elm.hasClass('clickedTouch')) {
                    $elm.addClass('clickedTouch');
                } else {
                    $elm.toggleClass('clicked');
                }
            }
        }
        isTouchScreen() {
            return ('ontouchstart' in window);
        }
        havePointer() {
            return matchMedia('(pointer:fine)').matches;
        }
        onClickToggleMenu() {
            this.$menu.toggleClass('menu--opened');
            if(this.$menu.hasClass('menu--opened')) {
                $('body').append($('<div class="menu__overlay"></div>'));
            } else {
                $('.menu__overlay').remove();
            }
        }
        onClickToggleIcon(event, open) {
            let $elm = $(event.srcElement);
            if(!$elm.hasClass('menu__univers-title') && !$elm.hasClass('menu__sub-item-title')) {
                $elm = $elm.parent();
            }
            this.resetElement($elm);
            if(open) {
                $elm.removeClass('menu__show-more')
                    .addClass(' menu__show-less');
                $elm.find('.menu__icon').html('-')
            } else {
                $elm.addClass('menu__show-more')
                    .removeClass(' menu__show-less');
                $elm.find('.menu__icon').html('+')
            }
        }
        resetElement($elm) {
            if($elm.hasClass('menu__univers-title')) {
                const $elements = $('.menu__univers-title.menu__show-less');
                $elements
                    .removeClass('menu__show-less')
                    .addClass('menu__show-more');
                $elements.find('.menu__icon').html('+')
            } else if($elm.hasClass('menu__sub-item-title')) {
                const $elements = $elm.parent().parent().find('.menu__sub-item-title.menu__show-less');
                $elements
                    .removeClass('menu__show-less')
                    .addClass('menu__show-more');
                $elements.find('.menu__icon').html('+')
            }
        }
        openSearch() {
            this.onClickToggleMenu();
            $('.menu__search-input').focus();
        }
    };
})(jQuery);
new PictimeMenu();