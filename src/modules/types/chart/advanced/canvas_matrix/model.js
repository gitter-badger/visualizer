'use strict';

define(['modules/default/defaultmodel', 'src/util/datatraversing'], function (Default, Traversing) {

    function Model() {
    }

    function getjPath(data) {
        if (data == null)
            return [];

        var jpaths = [];
        Traversing.getJPathsFromElement(data, jpaths);

        return jpaths;
    }

    Model.prototype = $.extend(true, {}, Default, {

        getValue: function () {
            return this.dataValue;
        },

        getjPath: function (rel, accepts) {

            var data = this.module.getDataFromRel('matrix');

            if (!data)
                return;

            data = data.value;
            if (!data)
                return;

            switch (rel) {
                case 'row':
                    data = data.yLabel[0];
                    return getjPath(data, accepts);
                    break;
                case 'col':
                    data = data.xLabel[0];
                    return getjPath(data, accepts);
                    break;
                case 'intersect':
                    data = data.data[0][0];
                    return getjPath(data, accepts);
                    break;
                default:
                    return false;
                    break;
            }
        }

    });

    return Model;

});