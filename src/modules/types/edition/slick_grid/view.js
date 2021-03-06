'use strict';

require.config({
    paths: {
        // jQuery & jQuery UI

        dragevent:     'components/slickgrid/lib/jquery.event.drag-2.2',
        dropevent:     'components/slickgrid/lib/jquery.event.drop-2.2',

        // SlickGrid
        slickcore:     'components/slickgrid/slick.core',
        slickgrid:     'components/slickgrid/slick.grid',
        slickdataview: 'components/slickgrid/slick.dataview'
    },
    shim: {
        dragevent:     ['jquery'],
        dropevent:     ['jquery'],
        slickcore:     ['jqueryui', 'components/jquery/jquery-migrate.min'],
        slickgrid:     ['slickcore', 'dragevent', 'dropevent','components/slickgrid/plugins/slick.cellrangedecorator',
            'components/slickgrid/plugins/slick.cellrangeselector' ,
            'components/slickgrid/plugins/slick.cellselectionmodel' ,
            'components/slickgrid/slick.formatters',
            'modules/types/edition/slick_grid/slick.editors.custom'],
        slickdataview: ['slickgrid']

    }
});


define(['require', 'modules/default/defaultview', 'src/util/debug', 'lodash', 'src/util/util', 'src/util/api', 'src/util/typerenderer','src/util/datatraversing', 'slickgrid', 'slickdataview'], function(require, Default, Debug, _, Util, API, Renderer, Traversing) {
    function View() {}
    Util.loadCss('./components/slickgrid/slick.grid.css');


    var formatters = {
        typerenderer: waitingFormatter,
        'slick.text': Slick.Formatters.Text,
        'slick.percent': Slick.Formatters.PercentComplete,
        'slick.percentbar': Slick.Formatters.PercentCompleteBar,
        'slick.yesno': Slick.Formatters.YesNoSelect
    };

    var typeEditors = {
        boolean: Slick.Editors.Checkbox,
        mf: Slick.Editors.TextValue,
        color: Slick.Editors.ColorValue,
        string: Slick.Editors.TextValue,
        number: Slick.Editors.TextValue
    };

    View.prototype = $.extend(true, {}, Default, {

        init: function() {
            if (! this.$dom) {
                this._id = Util.getNextUniqueId();
                this.$dom = $('<div>').attr('id', this._id).css({
                    width: '100%',
                    height: '100%'
                });
                this.module.getDomContent().html(this.$dom);
                //$('body').append(this.$dom);
            }


            this.slick = {};
            this.colConfig = this.module.getConfiguration('colsjPaths');
            this.resolveReady();
        },


        getSlickColumns: function() {
            var that = this;
            var tp = $.proxy(typeRenderer, this);
            var slickCols = this.colConfig.map(function(row) {
                var editor, type;
                if(row.editor === 'auto' && that.module.data) {
                    var obj = that.module.data.get(0).getChildSync(row.jpath);
                    if(obj instanceof DataString || obj instanceof DataNumber) {
                        editor = Slick.Editors.SpecialNativeObject;
                    }
                    else {
                        type = that.module.data.get(0).getChildSync(row.jpath).type;
                        editor = typeEditors[type];
                    }


                }
                return {
                    id: row.name,
                    name: row.name,
                    field: row.name,
                    width: +row.width || undefined,
                    minWidth: +row.minWidth || undefined,
                    maxWidth: +row.maxWidth || undefined,
                    resizable: row.resizable.indexOf('yes') > -1 ? true : undefined,
                    selectable: row.selectable.indexOf('yes') > -1 ,
                    focusable: row.focusable.indexOf('yes') > -1,
                    sortable: row.sortable.indexOf('yes') > -1,
                    defaultSortAsc: row.defaultSortAsc.indexOf('yes') > -1,
                    editor: editor,
                    formatter: formatters[row.formatter],
                    asyncPostRender: (row.formatter === 'typerenderer') ? tp : undefined,
                    jpath: row.jpath,
                    dataType: type
                }
            });
            if(this.module.getConfigurationCheckbox('slickCheck', 'rowDelete')) {
                slickCols.unshift({
                    id: 'rowDeletion',
                    width: 30,
                    field: 'rowDeletion',
                    selectable: false,
                    resizable: false,
                    focusable: false,
                    sortable: false,
                    formatter: binFormatter
                });
            }
            return slickCols;
        },

        getSlickOptions: function() {
            var that = this;
            return {
                editable: that.module.getConfigurationCheckbox('slickCheck', 'editable'),
                enableAddRow: that.module.getConfigurationCheckbox('slickCheck', 'enableAddRow'),
                enableCellNavigation: that.module.getConfigurationCheckbox('slickCheck', 'enableCellNavigation'),
                autoEdit: that.module.getConfigurationCheckbox('slickCheck', 'autoEdit'),
                enableTextSelectionOnCells: that.module.getConfigurationCheckbox('slickCheck', 'enableTextSelectionOnCells'),
                enableColumnReorder: that.module.getConfigurationCheckbox('slickCheck', 'enableColumnReorder'),
                forceFitColumns: that.module.getConfigurationCheckbox('slickCheck', 'forceFitColumns'),
                asyncEditorLoading: true,
                enableAsyncPostRender: true,
                asyncPostRenderDelay: 0,
                dataItemColumnValueExtractor: function(item, coldef) {
                    return item;
                },
                rowHeight: that.module.getConfiguration('slick.rowHeight')
            };
        },


        inDom: function(){




        },

        update: {

            list: function( moduleValue ) {
                console.log('UPDATE');

                var that =  this;
                var l = moduleValue.get().length;
                this.module.data = moduleValue;

                this.slick.columns = this.getSlickColumns();
                this.slick.options = this.getSlickOptions();
                this.slick.data = this.module.data;

                that.grid = new Slick.Grid("#"+that._id, that.slick.data, that.slick.columns, that.slick.options);

                that._activateHighlights();

                that.grid.setSelectionModel(new Slick.CellSelectionModel());
                that.grid.module = that.module;

                if(!_.isUndefined(that.lastActiveRow)) {
                    if(that.module.getConfigurationCheckbox('slickCheck', 'autoFocus')) {
                        that.grid.gotoCell(that.lastActiveRow, that.lastActiveCell);
                    }
                    else {
                        that.grid.setActiveCell(that.lastActiveRow, that.lastActiveCell);
                    }
                }
                if(that.lastViewport) {
                    that.grid.scrollRowToTop(that.lastViewport.top);
                }

                that._resetDeleteRowListeners();
                that.grid.onAddNewRow.subscribe(function (e, args) {
                    var item = args.item;
                    var jpath = args.column.jpath.slice();
                    jpath.unshift(that.module.data.length);
                    that.module.model.dataSetChild(that.module.data, jpath, item).then(function() {
                        var row = that.module.data.length - 1;
                        that.grid.updateRowCount();
                        that.grid.invalidateRow(row);
                        that.grid.render();
                        that.module.controller.onRowNew(row);
                        that._resetDeleteRowListeners();
                    });

                });

                that.grid.onViewportChanged.subscribe(function(args) {
                    // onViewportChange is not really working properly, so we hack by having a settimeout
                    // Acceptable since it is unlikely that someone click the delete button only 300 ms after
                    // the viewport has changed...
                    setTimeout(function() {
                        that.lastViewport = that.grid.getViewport();
                        that._resetDeleteRowListeners();
                    }, 300);
                    that.lastViewport = that.grid.getViewport();
                });


                that.grid.onMouseEnter.subscribe(function(e) {
                    var cell = that._checkCellFromEvent(e);
                    if(!cell) return;
                    var hl = that.module.data[cell.row]._highlight;
                    if(hl) {
                        API.highlightId(hl,1);
                        lastHighlight = hl;
                    }
                    that.module.controller.onHover(cell.row);

                });

                that.grid.onMouseLeave.subscribe(function(e) {
                    var cell = that._checkCellFromEvent(e);
                    if(!cell) return;
                    var hl = that.module.data[cell.row]._highlight;
                    if(hl) {
                        API.highlightId(hl,0);
                    }
                    else if(lastHighlight) {
                        API.highlightId(lastHighlight,0);
                    }

                });

                that.grid.onClick.subscribe(function(e,args) {
                    var columns = that.grid.getColumns();
                    if(!_.isUndefined(args.row)) {
                        if(columns[args.cell] && columns[args.cell].id !== 'rowDeletion') {
                            that.module.controller.onClick(args.row);
                        }
                    }
                });

                that.grid.onColumnsResized.subscribe(function(e, args) {
                    var cols = that.grid.getColumns();
                    for(var i=0; i<cols.length; i++) {
                        that.module.definition.configuration.groups.cols[0][i].width = cols[i].width;
                    }
                    if(that.module.getConfigurationCheckbox('slickCheck', 'resizeRerender')) {
                        that.grid.invalidate();
                    }

                });

                that.grid.onCellChange.subscribe(function (e, args) {
                    that.module.controller.onRowChange(args.row);
                });

                that.grid.onActiveCellChanged.subscribe(function(e, args) {
                    that.lastActiveCell = args.cell;
                    that.lastActiveRow = args.row;
                });

                that.grid.onColumnsReordered.subscribe(function(e, args) {
                    var cols = that.grid.getColumns();
                    var conf = that.module.definition.configuration.groups.cols[0];
                    var names = _.pluck(conf, 'name');
                    var ids = _.pluck(cols, 'id');

                    if(names.concat().sort().join() !== ids.concat().sort().join()) {
                        Debug.warn('Something might be wrong, number of columns in grid and in configuration do not match');
                        return;
                    }
                    that.module.definition.configuration.groups.cols[0] = [];
                    for(var i=0; i<cols.length; i++) {
                        var idx = names.indexOf(ids[i]);
                        if(idx > -1) {
                            that.module.definition.configuration.groups.cols[0].push(conf[idx]);
                        }
                    }
                });
            }

        },

        _resetDeleteRowListeners: function() {
            var that = this;
            var $rb = that.$rb = $('a.recycle-bin');
            $rb.off('click');
            $rb.on('click', function(e) {
                var columns = that.grid.getColumns();
                var args = that._checkCellFromEvent(e);
                that.lastViewport = that.grid.getViewport();
                if(columns[args.cell] && columns[args.cell].id === 'rowDeletion') {
                    // delete the row...
                    that.module.data.splice(args.row, 1);
                    that.module.data.triggerChange();
                }

            });
        },

        _checkCellFromEvent: function(e) {
            var cell = this.grid.getCellFromEvent(e);
            if(cell.row >= this.module.data.length) {
                return null;
            }
            return cell;
        },

        _drawHighlight: function(key) {
            this.grid.setCellCssStyles(key, this.cellStyles[key]);
        },

        _undrawHighlight: function(key) {
            this.grid.removeCellCssStyles(key);
        },


        _activateHighlights: function() {
            var that = this;
            var hl = _(this.module.data).pluck('_highlight').uniq().value();
            var cols = this.grid.getColumns();
            var base = {};
            for(var i=0; i<cols.length; i++) {
                base[cols[i].id] = 'highlighted-cell';
            }

            var r = {};
            for(var j=0; j<this.module.data.length; j++) {
                var h= this.module.data[j]._highlight;
                if(!h) continue;
                if(!r[h]) r[h] = {};

                r[h][j.toString()] = base;
            }

            this.cellStyles = r;


            API.killHighlight(this.module.getId());

            for(i=0; i<hl.length; i++) {
                (function(i) {
                    API.listenHighlight({_highlight: hl[i]}, function(onOff, key) {
                        if(onOff) {
                            that._drawHighlight(key);
                        }
                        else {
                            that._undrawHighlight(key);
                        }
                    });
                })(i);
            }
        },

        onResize: function() {
            if(this.grid) {
                this.grid.resizeCanvas();
            }
        }
    });

    function waitingFormatter() {
        return "wait...";
    }

    function binFormatter() {
        return '<div style="width:100%; height: 100%; display: table-cell"><a class="recycle-bin"></a></div>';
    }

    function requiredFieldValidator(value) {
        if (value == null || value == undefined || !value.length) {
            return {valid: false, msg: "This is a required field"};
        } else {
            return {valid: true, msg: null};
        }
    }

    function typeRenderer(cellNode, row, dataContext, colDef) {
        this.module.data.traceSync([row]);
        var def = Renderer.toScreen(dataContext, this.module, {}, colDef.jpath);
        def.always(function(value) {
            $(cellNode).html(value);
            if(def.build) {
                def.build();
            }
        });
    }

    var lastHighlight = '';
    return View;

});