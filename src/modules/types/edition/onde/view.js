'use strict';

define(['modules/default/defaultview', 'src/util/util', 'jquery', 'components/onde/src/onde', 'forms/button', 'lodash'], function (Default, Util, $, onde, Button, _) {

    function View() {
        this._id = Util.getNextUniqueId();
    }

    Util.loadCss('components/onde/src/onde.css');

    View.prototype = $.extend(true, {}, Default, {
        init: function () {
            var that = this;
            this.dom = $('<form id="' + this._id + '">').css({
                height: '100%',
                width: '100%',
                textAlign: 'center'
            }).append($('<div class="onde-panel">'));

            if (this.module.getConfigurationCheckbox('hasButton', 'show')) {
                this.dom.append(new Button(this.module.getConfiguration('button_text'), function () {
                    that.exportForm();
                }, {color: 'green'}).render().css({
                        marginTop: "10px"
                    }));
            }

            this.dom.on('submit', function (e) {
                e.preventDefault();
                that.exportForm();
                return false;
            });

            var debouncing = this.module.getConfiguration('debouncing', -1);
            if (debouncing > -1) {
                var cb = function () {
                    that.exportForm();
                };
                if (debouncing > 0) {
                    cb = _.debounce(cb, debouncing);
                }
                this.dom.on('input change', cb);
            }

            this.inputVal = {};

        },
        blank: {},
        inDom: function () {
            this.module.getDomContent().html(this.dom);
            this.initForm();
            this.resolveReady();
        },
        initForm: function () {
            this.form = new onde.Onde(this.dom);
            this.renderForm();
        },
        update: {
            inputValue: function (value) {
                this.inputObj = value;
                this.inputVal = value.resurrect();
                this.renderForm();
            },
            schema: function (value) {
                this.module.controller.inputSchema = value;
                this.renderForm();
            }
        },
        renderForm: function () {
            var schema = this.module.controller.getSchema();
            this.form.render(schema, this.inputVal, {});
        },
        exportForm: function () {
            var data = this.form.getData();
            if (!data.errorCount) {
                this.module.controller.onSubmit(data.data);
            }
        }
    });

    return View;

});