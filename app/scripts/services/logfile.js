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

akoenig.cinnamon.service('LogfileService', [
    '$q',
    '$http',
    'ConfigService',

    function ($q, $http, ConfigService) {

        'use strict';

        var apiEndpoint = ConfigService.getApiEndpoint() + '/logfiles';

        /**
         * DOCME
         *
         */
        this.findByDirectory = function (directory) {
            var deferred = $q.defer();

            $http
                .get(apiEndpoint + '/' + directory)
                .success(function (logfile, status, headers) {
                    deferred.resolve(logfile);
                })
                .error(function (data, status) {
                    deferred.reject({
                        status: status,
                        data: data
                    });
                });

            return deferred.promise;
        };
    }
]);