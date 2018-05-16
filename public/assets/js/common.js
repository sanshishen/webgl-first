require.config({
    baseUrl: '/assets/',
    paths: {
        'jquery': 'lib/jquery-3.3.1.min',
        'jquery.mousewheel': 'lib/jquery.mousewheel-3.1.13.min'
    },
    shim: {
        'jquery.mousewheel': ['jquery']
    }
});