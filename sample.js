//Sample Usage
Ext.onReady(function() {
    //Define a store to use as carousel items.
    var store = Ext.create('Ext.data.Store', {
        fields: ['title', 'imgSrc'],
        data: [{
            title: 'Cloud Forest',
            imgSrc: 'http://www.irpedia.com/upload/iblock/986/9861ba4be2ccb35b2cf655c68eb6d7b6.jpg'},
        {
            title: 'Cloud Forest 2',
            imgSrc: 'http://www.irpedia.com/upload/iblock/e94/e94a2e2acf3cfadfdc815c442fec6e79.jpg'},
        {
            title: 'Cloud Forest',
            imgSrc: 'http://www.irpedia.com/upload/iblock/aac/aac93f9f82dbb656ece5f9b546ef0417.jpg'}]
    });

    //Define a customized carousel
    Ext.define('MyCarousel', {
        extend: 'Ext.ux.Carousel',
        alias: 'widget.mycarousel',
        template: '<img src="{imgSrc}" alt="{title}" style="width:300px;height:225px" />',
        store: store,
        interval: 3000,
        direction: 'left',
        loop: true,
        buttons: false,
        puaseOnHover: true,
        width: 300,
        height: 225
    });

    //Create a panel and use mycarousel as one of it's child item.
    Ext.create('Ext.panel.Panel', {
        width: '100%',
        height: 300,
        items: [
            {
            html: 'This Page should be seen in a css3 supported web browser'},
        {
            xtype: 'mycarousel'}
        ],
        renderTo: Ext.getBody()
    });
})
