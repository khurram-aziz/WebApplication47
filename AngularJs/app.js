// Load libraries
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

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
