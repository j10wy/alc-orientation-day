alcStarter.service('bikeParkingService', function($firebaseObject) {
        var bikesRef = new Firebase("https://alc-bike-parking.firebaseio.com/");
        return $firebaseObject(bikesRef);
    })