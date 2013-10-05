/*
 * cinnamon-webui
 *
 * A continuous integration server on top of substacks cicada.
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

'use strict';

var akoenig = akoenig || {};

akoenig.cinnamon = angular.module('akoenig.cinnamon', ['ngRoute']).config([

    '$routeProvider',

    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .otherwise({
              redirectTo: '/'
            });
    }
]);