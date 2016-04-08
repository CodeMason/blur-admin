/**
 * @author v.lugovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('baPanelBlur', baPanelBlur);

  /** @ngInject */
  function baPanelBlur(baPanelBlurHelper, $window, $rootScope) {
    var bodyBgSize;

    baPanelBlurHelper.bodyBgLoad().then(function() {
      bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
    });

    $window.addEventListener('resize', function() {
      bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
    });

    return {
      restrict: 'A',
      link: function($scope, elem) {
        if(!$rootScope.$isMobile) {
          elem.append('<div class="bg"></div>')
          baPanelBlurHelper.bodyBgLoad().then(function () {
            setTimeout(recalculatePanelStyle);
          });
          $window.addEventListener('resize', recalculatePanelStyle);

          $scope.$on('$destroy', function () {
            $window.removeEventListener('resize', recalculatePanelStyle);
          });
        }

        function recalculatePanelStyle() {
          if (!bodyBgSize) {
            return;
          }
          elem.children('.bg').css({
            backgroundSize: Math.round(bodyBgSize.width) + 'px ' + Math.round(bodyBgSize.height) + 'px',
            backgroundPosition: Math.floor(bodyBgSize.positionX) + 'px ' + Math.floor(bodyBgSize.positionY) + 'px',
            width: Math.round(bodyBgSize.width)+ 'px ',
            height: Math.round(bodyBgSize.height)+ 'px ',
            top: Math.floor(bodyBgSize.positionY) + 'px ',
            left: Math.floor(bodyBgSize.positionX) + 'px '
          });


          //elem.children('style').remove();
          //var style = "<style>";
          //var id = '_' + Math.random().toString(36).substr(2, 9);
          //elem.attr('id', id);
          //var backgroundSize = Math.round(bodyBgSize.width) + 'px ' + Math.round(bodyBgSize.height) + 'px';
          //var backgroundPosition = Math.floor(bodyBgSize.positionX) + 'px ' + Math.floor(bodyBgSize.positionY) + 'px';
          //elem.append('<style>'
          //  + '#' + id + '::before{background-size:' + backgroundSize + ';'
          //  + 'width:' + Math.round(bodyBgSize.width).toString() + 'px;'
          //  + 'height:' + Math.round(bodyBgSize.height).toString() + 'px;'
          //  + 'top:' + Math.floor(bodyBgSize.positionY).toString() + 'px;'
          //  + 'left:' + Math.floor(bodyBgSize.positionX).toString() + 'px;'
          //  + '}'
          //  + '</style>')
        }

      }
    };
  }

})();
