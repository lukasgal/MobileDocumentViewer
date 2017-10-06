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
      
.controller('menuCtrl', ['$scope','$sce', '$stateParams','$http',
function ($scope, $sce, $stateParams, $http) {
	

}])
.controller('settingsCtrl', ['$scope','$sce', '$stateParams','$http','$ionicPopup',
function ($scope, $sce, $stateParams, $http, $ionicPopup) {
	$scope.input = {
		kcenterurl : "http://nb139.usucz.usu.grp:8080/knowledgecenter/",
		userid : "admin",
		password : "admin",
		docsUrl : 'testDocuments.json'
	};
	$scope.getDocsUrl = function(){
		var url = this.input.kcenterurl;
		if(url.endsWith("/")){
			url = url.substring(0,url.length-1);
		}
		if(this.input.docsUrl){
			var docsUrl = this.input.docsUrl;
						
			if(docsUrl.indexOf("/")!=0){
				docsUrl = "/"+docsUrl;
			}
			url = url+docsUrl;
		}
		return url;
	};
	$scope.testConnection= function (input){  
		var url = $scope.getDocsUrl();
		var invocation = new XMLHttpRequest();
		if (!url.startsWith("http")) return;
	  	if(invocation) {
			invocation.open('POST', url);
		    invocation.withCredentials = true;	
		    invocation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
		    invocation.onreadystatechange = function () {
				
		        if (invocation.readyState === 4) {
					var resultText = "";
					if(invocation.status==200){
						resultText = "Test passed";
					}else {
						resultText = "Test failed";
					}
		            $ionicPopup.alert({
              			title: 'Test result',
              			content: "<h3>"+resultText+"</h3><br><small>URL: "+invocation.responseURL+"</small><br>Status : "+invocation.status
            		})
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
}])
   