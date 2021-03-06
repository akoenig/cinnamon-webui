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
    '$timeout',
    'BuildService',
    'LogfileService',

    function ($scope, $timeout, BuildService, LogfileService) {
        $scope.loading = true;

        BuildService.list().then(
            function success (builds) {
                $scope.builds = builds;
                $scope.loading = false;
            }
        );

        // Long polling
        (function polling() {
            BuildService.list().then(
                function success (builds) {
                    var oldBuilds = angular.copy($scope.builds) || [];

                    $scope.builds = builds;

                    oldBuilds.forEach(function (b1) {
                        if (b1.showLogfile) {
                            $scope.builds.forEach(function (b2) {
                                if (b1.id === b2.id) {
                                    b2.showLogfile = true;
                                    b2.logfile = b1.logfile;
                                }
                            });
                        }
                    });

                    $timeout(polling, 5000);
                }
            );
        })();

        $scope.isClearable = function () {
            var running = false;

            if ($scope.builds && $scope.builds.length) {
                $scope.builds.forEach(function (build) {
                    if (!running && build.running) {
                        running = true;
                    }
                });

                return !running;
            } else {
                return false;
            }
        }

        /**
         * Deletes all builds.
         *
         */
        $scope.clear = function () {
            var tasks;

            if (window.confirm('Sure?')) {
                tasks = [];

                $scope.builds.forEach(function (build) {
                    tasks.push(function (cb) {
                        BuildService.remove(build.id).then(cb, cb);
                    })
                });

                async.parallel(tasks, function done () {
                    $scope.builds = BuildService.list();
                });
            }
        }

        /**
         * DOCME
         *
         */
        $scope.toggleLogfile = function (build) {
            if (build.showLogfile) {
                build.showLogfile = false;
            } else {
                LogfileService.findByDirectory(build.directory).then(
                    function (logfile) {
                        build.logfile = logfile;
                        build.showLogfile = true;
                    },
                    function (err) {
                        if (404 === err.status) {
                            build.logfile = 'Log file does not exist.\n\nHave you piped the output from your tests to "cinnamon.log"?';
                        } else {
                            build.logfile = 'Error while loading logfile.';
                        }
                        build.showLogfile = true;
                    }
                );
            }
        };
    }
]);