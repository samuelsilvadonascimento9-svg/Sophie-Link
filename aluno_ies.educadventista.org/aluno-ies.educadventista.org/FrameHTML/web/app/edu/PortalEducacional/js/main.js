requirejs.config({
    //Parâmetros utilizado para controlar o caching dos arquivos javascript
    urlArgs: 'cache=' + (new Date()).getDay(),
    waitSeconds: 0,
    paths: {
        'bootstrap': '../../../../js/libs/bootstrap/dist/js/bootstrap',
        'angular-animate': '../../../../js/libs/angular-animate/angular-animate',
        'angular-bootstrap': '../../../../js/libs/angular-bootstrap/ui-bootstrap-tpls',
        'angular-hotkeys': '../../../../js/libs/angular-hotkeys/build/hotkeys',
        'angular-i18n': '../../../../js/libs/angular-i18n/angular-locale_pt-br',
        'angular-nestable': '../../../../js/libs/angular-nestable/src/angular-nestable',
        'angular-resource': '../../../../js/libs/angular-resource/angular-resource',
        'angular-sanitize': '../../../../js/libs/angular-sanitize/angular-sanitize',
        'angular-scroll': '../../../../js/libs/angular-scroll/angular-scroll.min',
        'angular-ui-mask': '../../../../js/libs/angular-ui-mask/dist/mask',
        'angular-ui-router': '../../../../js/libs/angular-ui-router/release/angular-ui-router',
        'angular-ui-select': '../../../../js/libs/angular-ui-select/dist/select',
        'angular-cookies': '../../../../js/libs/angular-cookies/angular-cookies',

        'angularAMD': '../../../../js/libs/angularAMD/angularAMD',
        'ng-load': '../../../../js/libs/angularAMD/ngload',
        'js-cookie': '../../../../js/libs/js-cookie/src/js.cookie',

        'AngularJS-Toaster': '../../../../js/libs/AngularJS-Toaster/toaster',
        'ngDraggable': '../../../../js/libs/ngDraggable/ngDraggable',
        'ngMask': '../../../../js/libs/ngMask/dist/ngMask.min',

        'fileSaver': '../../../../js/libs/file-saver/fileSaver.min',

        'totvs-html-framework': '../../../../js/libs/totvs-html-framework/totvs-html-framework.min',

        'oclazyload': '../../../../js/libs/oclazyload/dist/ocLazyLoad.require'
    },
    shim: {

        'bootstrap-datepicker': ['bootstrap'],
        'bootstrap-datepicker.pt-BR': ['bootstrap', 'bootstrap-datepicker'],
        'bootstrap-switch': ['bootstrap'],

        'AngularJS-Toaster': ['angular-animate'],

        'totvs-app.route': ['totvs-app.module'],
        'totvs-app.config': ['totvs-app.module'],

        'totvs-html-framework': ['angular-i18n', 'angular-resource', 'ngMask']
    },
    priority: ['angular'],
    deps: [
        'ng-load',
        'angular-scroll',
        'angular-animate',
        'angular-bootstrap',
        'angular-hotkeys',
        'angular-i18n',
        'angular-nestable',
        'angular-resource',
        'angular-sanitize',
        'angular-ui-mask',
        'angular-ui-router',
        'angular-ui-select',
        'angular-cookies',

        'bootstrap',

        'AngularJS-Toaster',

        'ngDraggable',

        'ngMask',

        'oclazyload',

        'fileSaver'
    ]
});

requirejs(['totvs-app.module'], function() {

});