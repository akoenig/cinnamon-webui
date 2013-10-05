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

akoenig.cinnamon.service('BuildService', [
    '$q',
    '$http',
    'ConfigService',

    function ($q, $http, ConfigService) {

        'use strict';

        var apiEndpoint = ConfigService.getApiEndpoint() + '/builds';

        /**
         * DOCME
         *
         */
        this.list = function () {
            var deferred = $q.defer();

            $http
                .get(apiEndpoint)
                .success(function (builds, status, headers) {
                    deferred.resolve(builds);
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