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

akoenig.cinnamon.controller('HomeController', [
    '$scope',
    'BuildService',
    'LogfileService',

    function ($scope, BuildService, LogfileService) {
        $scope.builds = BuildService.list();

        $scope.toggleLogfile = function (build) {
            console.log(build.showLogfile)
            if (build.showLogfile) {
                build.showLogfile = false;
            } else {
                LogfileService.findByDirectory(build.directory).then(
                    function (logfile) {
                        build.logfile = logfile;
                        build.showLogfile = true;
                    },
                    function () {
                        build.logfile = 'Error while loading logfile.';
                        build.showLogfile = true;
                    }
                );
            }
        };
    }
]);