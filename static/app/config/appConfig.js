app.run(['$rootScope', '$transitions',
    function ($rootScope, $transitions) {
        $transitions.onSuccess({}, function () {
            $("html, body").animate({scrollTop: 0}, 200);
        });

        $rootScope.$on('mapInitialized', function(evt,map) {
          google.maps.event.addListener(map, "idle", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
          });
        });
    }
]);