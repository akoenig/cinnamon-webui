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

akoenig.cinnamon.service('ConfigService', [

    function () {

        'use strict';

        var endpoint = function (api) {
            var baseUrl = window.location.protocol + '//' + window.location.host,
                url = baseUrl + (api ? '/api' : ''),
                yeomanPort = 9000,
                expressPort = 7777;

            if (url.indexOf(yeomanPort) !== -1) {
                url = url.replace(yeomanPort, expressPort);
            }

            return url;
        };

        // Returns the backends api endpoint
        // from where the frontend can grab its data.
        this.getApiEndpoint = function () {
            return endpoint(true);
        };

        this.getEndpoint = function () {
            return endpoint();
        };
    }
]);