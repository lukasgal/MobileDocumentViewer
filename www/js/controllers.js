angular.module('app.controllers', [])
  
.controller('documentViewCtrl', ['$scope','$sce', '$stateParams','$location','$ionicHistory', 

function ($scope, $sce, $stateParams, $location,$ionicHistory) {
	
	$scope.prepareUrl = function(url){
		if(url){
			if(typeof url =="string" && url.indexOf("?")>0) {
				url += "&";
			}else {
				url +="?";
			}
			url +="&dummyVar="+ (new Date()).getTime();
			return $sce.trustAsResourceUrl(url);			
		}
		return url;
	}
	
	$scope.document = {};
	var docsScope = angular.element(document.querySelector('[ng-controller=documentsCtrl]')).scope();
	if(!docsScope) return;
	var doc = docsScope.getDocument($stateParams.id);
	if(doc){
		doc.url = $scope.prepareUrl(doc.url);
		$scope.document = doc;
	}
	
	$scope.goBack = function(){
		$ionicHistory.goBack();
	}
	
	
}])
      
.controller('menuCtrl', ['$scope','$sce', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $sce, $stateParams, $http) {
	$scope.input = {kcenterurl : "http://nb139.usucz.usu.grp:8080/knowledgecenter/",
		userid : "admin",
		password : "admin"
	}
	$scope.SignUp= function (input){  
		var url = input.kcenterurl;
		var invocation = new XMLHttpRequest();
		if (!url.startsWith("http")) return;
	  	if(invocation) {
			invocation.open('POST', url);
		    invocation.withCredentials = true;	
		    invocation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
		    invocation.onreadystatechange = function () {
		        if (invocation.readyState === 4) {
		            console.log("logged");
		    	}
		    }
		    invocation.send("gk_userid="+input.userid+"&gk_password="+input.password+"&gk_domain="+(input.domain || "")+"&gk_request=true&action=login");
		
		}
	}


}])
   
.controller('documentsCtrl', ['$scope', 'DocumentService', 
function ($scope, DocumentService) {
	$scope.documents = [];
	
	$scope.getDocument = function(id){
		for(var i = 0; i < this.documents.length;i++){
			var doc = this.documents[i];
			if(id == doc.id){
				return doc;
			}
		}
	};
	$scope.loadDocuments = function(){
		DocumentService.getDocuments().then(function(res){
			$scope.documents = res;
		});	
	}
	$scope.loadDocuments();
}])
   
.controller('winkoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 