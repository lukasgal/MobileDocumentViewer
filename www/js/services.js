angular.module('app.services', [])
.factory('DocumentService', ['$q','$http','$ionicPopup',function($q, $http,$ionicPopup){
	login = function (callback, url, user, psw, domain){
				var invocation = new XMLHttpRequest();
				if (!url || !url.startsWith("http")) return;
			  	if(invocation) {
					invocation.open('POST', url);
				    invocation.withCredentials = true;	
				    invocation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
				    invocation.onreadystatechange = function () {
				        if (invocation.readyState === 4) {
				            if (callback && typeof callback === 'function') {
				                callback(invocation);
				            }
				    	}
				    }
				    invocation.send("gk_userid="+user+"&gk_password="+psw+"&gk_domain="+(domain ||"")+"&gk_request=true&action=login");
				}
			}
	
	
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
                var errorMsg  = res.data.message +
                    "<br />status: " + res.status;
					$ionicPopup.alert({
              			title: res.data.status,
              			content: errorMsg
            		})
            }
			
			$http.get(base_url, {withCredentials : true}).then(callbackSuccess, errorCallback);
			//login(callback, base_url, docsScope.input.userid,docsScope.input.password);
			
            
            return deferred.promise;
        }
    }

}]);