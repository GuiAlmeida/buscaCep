app.run(['$rootScope', '$transitions',
    function ($rootScope, $transitions) {
        $transitions.onSuccess({}, function () {
            $("html, body").animate({scrollTop: 0}, 200);
        });
    }
]);