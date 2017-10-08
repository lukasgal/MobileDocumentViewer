angular.module('app.services', [])
.factory('DocumentService', ['$q','$http','$ionicPopup',function($q, $http,$ionicPopup){
    return {
        getDocuments:function() {
            var deferred = $q.defer();
			var documents = [];
			var docsScope = angular.element(document.querySelector('[ng-controller=settingsCtrl]')).scope();
			var base_url =  docsScope && docsScope.getDocsUrl();
			if(base_url==null ||base_url==""){
					$ionicPopup.alert({
              			title: 'Error',
              			content: 'There is not defined url to KCenter documents!'
            		})
					return;
			}
			var callbackSuccess = function(res){
				if(res.data){
					documents = res.data;	
					deferred.resolve(documents);	
				}else{
					$ionicPopup.alert({
              			title: 'Error',
              			content: 'No document found!'
            		})
				}
					
			};
			
			var errorCallback  = function (res) {
				var errorMsg = "Error while loading of documents";
				
				if(res && res.data && res.data.message){
					errorMsg = res.data.message;
				}
                 	
                errorMsg = errorMsg  + "<br />status: " + res.status;
					$ionicPopup.alert({
              			title: 'Error',
              			content: errorMsg
            		})
            }
			
			$http.get(base_url, {withCredentials : true}).then(callbackSuccess, errorCallback);
            return deferred.promise;
        }
    }

}])

.factory('SingletonDocument',['$window', '$location', '$rootScope', '$log','$stateParams','$state','$ionicLoading',
	function SingletonDocument($window, $location, $rootScope, $log,$stateParams,$state,$ionicLoading) {
		return {
			isInProgress : false,
				
			openDocument : function(url){
				$state.go("documentView",{url : url});
			},
			showProgress : function(){
				if(this.isInProgress) return;
				this.isInProgress = true;
				$ionicLoading.show({
			        template: 'Loading...'
      			});
			},
			hideProgress : function(){
				if(this.isInProgress){
					$ionicLoading.hide();	
					this.isInProgress = false;
				}
				
			}
			
		};
	}])

.factory('iFrameMessagingService', ['$window', '$location', '$rootScope', '$log','SingletonDocument',
	function iFrameMessagingService($window, $location, $rootScope, $log,SingletonDocument) {
	    var service = {
	        sendMessage : sendMessage
	    };

	    activate();
	    return service;

	    function activate(){
	        activateIncomingMessageHandler();
	    }

	    function activateIncomingMessageHandler(){
	        $window.addEventListener('message', function(event){
	            if (typeof(event.data) !== 'undefined'){
					try{
						var data = JSON.parse(event.data);	
					}catch(e){
						//console.log("failed to parse post message data");
						return;
					}
					
					var eventType = data.eventType;
					switch(eventType){
						case  "showPageDocument": 
							SingletonDocument.openDocument(data.url);
						break;
						case "openExternalLink":
							window.open(data.url,'_blank');
						break;
						case "progressStart":
							SingletonDocument.showProgress();
						break;
						case "progressEnd":
							SingletonDocument.hideProgress();
						break;

					}
	            }
	        });

	    }

	    function sendMessage(message){
	        // Dispatch the event.
	        $log.debug(message);
	        if($window.parent !== $window){
	            $window.parent.postMessage(message, '*');
	        }
	    }

	}


]);



