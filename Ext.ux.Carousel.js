//Ext.ux.Carousel code start
(function() {
    Ext.define('Ext.ux.Carousel', {
        extend: 'Ext.DataView',
        alias: 'widget.carousel',
        alternateClassName: 'carousel',
        baseCls: 'x-carousel',
        style: 'overflow: hidden;position: relative;',
        itemSelector: 'li.x-carousel-item',
        interval: 2000,
        taskCount: 0,
        baseStep: 0,
        autoStart: true,
        direction: 'left',
        loop: true,
        buttons: false,
        puaseOnHover: false,
        emptyText: 'no item to display',
        template: '',
        nextButtonText: 'next',
        previousButtonText: 'previous',
        slideContainerStyle: '-moz-transition: all 1s ease-in-out;-webkit-transition: all 1s ease-in-out;-o-transition: all 1s ease-in-out;transition: all 1s ease-in-out;position: absolute;',
        initComponent: function() {
            if (this.buttons) {
                this.tpl = "<div id=\"x-carousel-buttons\" style=\"position: absolute;z-index: 10000;\"><a href=\"#\" id=\"x-carousel-buttons-prev\">" + this.previousButtonText + "</a><a href=\"#\" id=\"x-carousel-buttons-next\">" + this.nextButtonText + "</a><div class=\"clear\"></div></div><div id=\"x-carousel-slides\" style=\"" + this.slideContainerStyle + "\"><ul><tpl for=\".\"><li class=\"x-carousel-item\"> " + this.template + " </li></tpl></ul></div>";
            } else {
                this.tpl = "<div id=\"x-carousel-slides\" style=\"" + this.slideContainerStyle + "\"><ul><tpl for=\".\"><li class=\"x-carousel-item\"> " + this.template + " </li></tpl></ul></div>";
            }
            this.on({
                itemmouseup: this.onMouseClick,
                childready: this.initializeView,
                afterrender: function() {
                    var that;
                    that = this;
                    return setTimeout(function() {
                        return that.fireEvent('childready');
                    }, 1000);
                },
                scope: this
            });
            return this.callParent(arguments);
        },
        initializeView: function(view, opt) {
            var display, float, that, ul;
            if (this.autoStart) {
                this.taskRunner();
            }
            if (this.puaseOnHover && this.taskCfg) {
                this.on({
                    itemmouseenter: this.onMouseOver,
                    itemmouseleave: this.onMouseOut,
                    scope: this
                });
            }
            this.itemHeight = this.height;
            this.itemWidth = this.width;
            ({
                float: '',
                display: ''
            });
            this.storeCount = this.store.getCount();
            this.slidesContainer = Ext.get('x-carousel-slides');
            debugger;
            this.slidesContainer.setTop(0);
            ul = this.slidesContainer.child('ul');
            if (this.direction === 'left') {
                float = 'left';
                display = 'inline-block';
                ul.setSize(this.itemWidth * this.storeCount * 2, this.itemHeight);
                this.slidesContainer.setLeft(0);
            } else if (this.direction === 'right') {
                float = 'right';
                display = 'inline-block';
                ul.setSize(this.itemWidth * this.storeCount * 2, this.itemHeight);
                this.slidesContainer.setRight(0);
            } else if (this.direction === 'up') {
                display = 'block';
                ul.setSize(this.itemWidth, this.itemHeight);
                this.slidesContainer.setLeft(0);
            }
            that = this;
            Ext.Array.each(Ext.DomQuery.select('.x-carousel-item'), function(item) {
                var itemEl;
                itemEl = Ext.get(item);
                itemEl.setSize(that.itemWidth, that.itemHeight);
                return itemEl.setStyle({
                    float: float,
                    display: display
                });
            });
            if (this.buttons) {
                Ext.get('x-carousel-buttons-next').on('click', this.next, this);
                return Ext.get('x-carousel-buttons-prev').on('click', this.previous, this);
            }
        },
        next: function() {
            if (this.taskCount < this.storeCount - 1) {
                return this.scroll[this.direction](this.slidesContainer, ++this.taskCount, this.itemWidth, this.itemHeight);
            }
        },
        previous: function() {
            if (this.taskCount >= 1) {
                return this.scroll[this.direction](this.slidesContainer, --this.taskCount, this.itemWidth, this.itemHeight);
            }
        },
        onMouseOver: function() {
            return Ext.TaskManager.stop(this.taskCfg);
        },
        onMouseOut: function() {
            return Ext.TaskManager.start(this.taskCfg);
        },
        onMouseClick: function() {
            return console.log('item clicked');
        },
        scroll: {
            up: function(el, count, itemWidth, itemHeight) {
                return el.setTop(-itemHeight * count);
            },
            left: function(el, count, itemWidth, itemHeight) {
                el.addCls('hor');
                return el.setLeft(-itemWidth * count);
            },
            right: function(el, count, itemWidth, itemHeight) {
                el.addCls('hor');
                return el.setRight(-itemWidth * count);
            }
        },
        loopHandler: {
            up: function(el) {
                return el.setTop(0);
            },
            left: function(el) {
                return el.setLeft(0);
            },
            right: function(el) {
                return el.setRight(0);
            }
        },
        restartTask: function(task) {
            Ext.TaskManager.stop(task);
            return Ext.TaskManager.start(task);
        },
        taskRunner: function() {
            this.taskCfg = {
                run: function(count) {
                    if (this.taskCount < this.storeCount) {
                        this.scroll[this.direction](this.slidesContainer, this.taskCount, this.itemWidth, this.itemHeight);
                        if (this.taskCount !== 0 && count === 1) {
                            this.baseStep = this.taskCount;
                        }
                        return this.taskCount = this.baseStep + count;
                    } else if (this.loop) {
                        this.baseStep = 0;
                        this.taskCount = 0;
                        this.loopHandler[this.direction](this.slidesContainer);
                        return this.restartTask(this.taskCfg);
                    } else {
                        return Ext.TaskManager.stop(this.taskCfg);
                    }
                },
                interval: this.interval,
                scope: this
            };
            return Ext.TaskManager.start(this.taskCfg);
        }
    });
}).call(this);

//Ext.ux.Carousel code End
