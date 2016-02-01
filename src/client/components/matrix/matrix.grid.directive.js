(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function MatrixGoToStep($log, $location, $timeout, $document){
		var buttonModality, buttonStep, currentItem, previousItem, modalityId, modalityName, modalityUrl, phaseUrl, phaseName, phaseId, currentCell;

		return {
			restrict: 'A',
			link: function(scope, element, attrib){
				element.bind('click', function(){

					buttonStep = angular.element(document.getElementsByClassName('js-go-to-step'));
					buttonModality = angular.element(document.getElementsByClassName('js-go-to-modality'));
					previousItem = angular.element(document.getElementsByClassName('matrix-grid--item'));
					currentItem = angular.element(this);
					
					phaseUrl = attrib.phaseUrl;
					modalityUrl = attrib.modalityUrl;
					
					phaseId = attrib.phaseId;
					modalityId = attrib.modalityId;
					
					phaseName = attrib.phaseName;
					modalityName = attrib.modalityName;

					previousItem.removeClass('active');
					buttonModality.removeAttr("id");
					
					currentItem.parent().addClass('active');
					buttonStep.addClass('matrix-body--button-is-active');
					buttonModality.addClass('matrix-body--button-is-active');

					buttonModality.attr({
						"modalityId": modalityId
					});

					buttonStep.attr({
						"modalityUrl": modalityUrl,
						"modalityName": modalityName,
						"phaseId": phaseId,
						"phaseUrl": phaseUrl,
						"phaseName": phaseName
					});
					sessionStorage.setItem('id', JSON.stringify({"phaseId": phaseId, "modalityId": modalityId}));
					
				});
			},
			controller: function(){
					loadSelectedProject();
					
					function loadSelectedProject(){
						var executed = false;
						var existsId = JSON.parse(sessionStorage.getItem('id'));

						if (existsId) {
							$timeout(function(){
								if (!executed) {
									executed = true;
									currentCell = angular.element(document.getElementsByClassName('js-id-' + existsId.modalityId + existsId.phaseId));
									currentCell.addClass('active');
									$document.duScrollTo(currentCell, 90, 800);
								}
								else{
									executed = false;
								}
							}, 1000);
						}
					}
			}
		};

	}

	MatrixGoToStep.$inject = ['$log', '$location', '$timeout', '$document'];

	angular.module('emus.matrix.grid.directive', [])
		.directive('jsCell', MatrixGoToStep);
}());