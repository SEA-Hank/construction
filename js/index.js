const _initEvent = Symbol('_initEvent');
const _listenScroll = Symbol('_listenScroll');
const _resize = Symbol('_resize');
const _classCtl = Symbol('_classCtl');
const _showMobileNav = Symbol('_showMobileNav');
const _hideMobileNav = Symbol('_hideMobileNav');
const _showOrHideMobileSubNav = Symbol('_showOrHideMobileSubNav');
class navController {
    constructor() {
        this.styleChangePoint = 850;
        this.navWrapperEle = document.getElementById("navigation");
        this.isMobile = document.body.offsetWidth < this.styleChangePoint;
        this.isMobileNavShowing = false;
        //For mobile navigation
        this.isMobilShowSubNav = false;
        this.masterNav = document.getElementById("nav");
        this.subNavWrapper = document.getElementsByClassName("subNavigation")[0];
        this.subNav = document.getElementById("subNav");
        this.menuLogo = document.getElementById("menuLogo");
        this[_initEvent]();
    }

    [_initEvent]() {
        document.addEventListener("scroll", function () {
            window.NavCtl[_listenScroll]();
        });
        window.addEventListener('resize', function () {
            window.NavCtl[_resize]();
        });
        //For mobile navigation
        this.menuLogo.addEventListener("click", function () {
            window.NavCtl[_showMobileNav]();
        });

        this.masterNav.addEventListener("click", function () {
            window.NavCtl[_hideMobileNav]();
        });
        this.subNavWrapper.addEventListener("click", function (e) {
            e.stopPropagation();
            window.NavCtl[_showOrHideMobileSubNav]();
        });
    };

    [_resize]() {
        this.isMobile = document.body.offsetWidth < this.styleChangePoint;
        if (this.isMobile) {
            this[_classCtl](this.navWrapperEle, "remove", "navBarToRegular");
            this[_classCtl](this.navWrapperEle, "remove", "navBarToSmall");
        }
    }

    [_listenScroll]() {
        if (this.isMobile) {
            return;
        }
        if ((window.scrollY > 50 && !this.navWrapperEle.classList.contains("navBarToSmall"))) {
            this[_classCtl](this.navWrapperEle, "remove", "navBarToRegular");
            this[_classCtl](this.navWrapperEle, "add", "navBarToSmall");
        }
        if ((window.scrollY <= 50 && !this.navWrapperEle.classList.contains("navBarToRegular"))) {
            this[_classCtl](this.navWrapperEle, "add", "navBarToRegular");
            this[_classCtl](this.navWrapperEle, "remove", "navBarToSmall");
        }
    }
    //For mobile navigation
    [_showMobileNav]() {
        this[_classCtl](this.masterNav, "add", "showMobileNav");
    }

    [_hideMobileNav]() {
        if (this.isMobile) {
            this[_classCtl](this.masterNav, "remove", "showMobileNav");
            this[_classCtl](this.subNav, "remove", "showSubNav");
            this[_classCtl](this.subNav, "remove", "hideSubNav");
            this.isMobilShowSubNav = false;
        }
    }

    [_showOrHideMobileSubNav]() {
        if (!this.isMobilShowSubNav) {
            this[_classCtl](this.subNav, "remove", "hideSubNav");
            this[_classCtl](this.subNav, "add", "showSubNav");
        } else {
            this[_classCtl](this.subNav, "add", "hideSubNav");
            this[_classCtl](this.subNav, "remove", "showSubNav");
        }
        this.isMobilShowSubNav = !this.isMobilShowSubNav;
    }

    [_classCtl](eleObj, action, className) {
        eleObj.classList[action](className);
    }
}


window.NavCtl = new navController();