import UserDetailsController from './UserDetailsController'

export default {
    name: 'userDetails',
    config: {
        bindings: { selected: '<' },
        templateUrl: '/AngularJs/users/components/details/UserDetails.html',
        controller: ['$mdBottomSheet', '$log', UserDetailsController]
    }
};