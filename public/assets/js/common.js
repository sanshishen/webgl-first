require.config({
    baseUrl: '/assets/',
    paths: {
        'jquery': 'js/jquery-3.3.1.min',
        'jquery.mousewheel': 'js/jquery.mousewheel-3.1.13.min'
    },
    shim: {
        'jquery.mousewheel': ['jquery']
    }
});