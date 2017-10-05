angular.module('app.services', [])
.factory('DocumentService', ['$q','$http',function($q, $http){
	var docsScope = angular.element(document.querySelector('[ng-controller=menuCtrl]')).scope();
	var kcurl = docsScope && docsScope.input && docsScope.input.kcenterurl ? docsScope.input.kcenterurl  : "";
	
	login = function (callback, url, user, psw, domain){
				var invocation = new XMLHttpRequest();
				if (!url.startsWith("http")) return;
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
			var base_url = kcurl+"/testdocuments.json";
			login(function(res){
				if(res.responseText!=""){
					try{
						var docs = JSON.parse(res.responseText);
						documents = docs;	
						deferred.resolve(documents);	
					}catch(e){
							
					}
				}
					
			}, base_url, "admin","admin");
			
            
            return deferred.promise;
        }
    }

}]);