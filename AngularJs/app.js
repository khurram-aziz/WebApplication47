import angular from 'angular';
//import 'angular-animate';     we can also use commonjs syntax require('angular-animate');
//import 'angular-aria';        we dont need to include these two libraries; as gulp is now creating the vendor bundle
import 'angular-material';      //if we dont import this; ngMaterial used below throws error

import AppController from './AppController';
import Users from './users/Users';

export default angular.module( 'starter-app', [ 'ngMaterial', Users.name ] )
  .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./svg/avatars.svg", 128)
      .icon("menu", "./svg/menu.svg", 24)
      .icon("share", "./svg/share.svg", 24)
      .icon("google_plus", "./svg/google_plus.svg", 24)
      .icon("hangouts", "./svg/hangouts.svg", 24)
      .icon("twitter", "./svg/twitter.svg", 24)
      .icon("phone", "./svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  })
  .controller('AppController', AppController);
