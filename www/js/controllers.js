angular.module('app.controllers', [])
  
.controller('documentViewCtrl', ['$scope','$sce', '$stateParams','$location','$ionicHistory','iFrameMessagingService','$ionicNavBarDelegate', 

function ($scope, $sce, $stateParams, $location,$ionicHistory,iFrameMessagingService,$ionicNavBarDelegate) {
	
	$scope.prepareUrl = function(url){
		
		if(url && typeof url =="string"){
			if(url.startsWith("http")){
				var i = url.indexOf("/docShow");
				url = url.substring(i,url.length);
			}
			var settScope = angular.element(document.querySelector('[ng-controller=settingsCtrl]')).scope();
			var base_url = settScope.input.kcenterurl;	
			url = settScope.composeUrl(base_url, url);
			
			url += (url.indexOf("mode=mobile")>0) ? "" : "&mode=mobile";
			
			if(url.indexOf("?")>0) {
				url += "&";
			}else {
				url +="?";
			}
			
			url +="&dummyVar="+ (new Date()).getTime();
			return $sce.trustAsResourceUrl(url);			
		}
		return url;
	}
	$ionicNavBarDelegate.showBackButton(false);
	$scope.document = {};
	$scope.document.url = $scope.prepareUrl($stateParams.url);
	/*var docsScope = angular.element(document.querySelector('[ng-controller=documentsCtrl]')).scope();
	if(!docsScope) return;
	var doc = docsScope.getDocument($stateParams.id);
	if(doc){
		doc.url = $scope.prepareUrl(doc.url);
		$scope.document = doc;
	}*/
	
	$scope.goBack = function(){
		$ionicHistory.goBack();
	}
	
	
}])
      
.controller('menuCtrl', ['$scope','$sce', '$stateParams','$http',
function ($scope, $sce, $stateParams, $http) {
	

}])
.controller('settingsCtrl', ['$scope','$sce', '$stateParams','$http','$ionicPopup','$cookieStore',
function ($scope, $sce, $stateParams, $http, $ionicPopup,$cookieStore) {
	
	$scope.getValue = function(key){
		return $cookieStore.get(key);	
	}
	
	$scope.input = {
		kcenterurl : ($scope.getValue("input.kcenterurl")) || "http://nb139.usucz.usu.grp:8080/knowledgecenter/",
		userid : ($scope.getValue("input.userid")) || "admin",
		password :($scope.getValue("input.password")) || "admin",
		docsUrl : ($scope.getValue("input.docsUrl")) || "testDocuments.json"
		
	};
	
	$scope.composeUrl = function(url1, url2){
		
		if(!url2.startsWith("http")){
			
			if(url1.endsWith("/")){
				url1 = url1.substring(0,url1.length-1);
			}
			if(url2.indexOf("/")!=0){
				url2 = "/"+url2;
			}
			return url1+url2;
		}
		return url2;
		
		
	}
	
	$scope.getDocsUrl = function(){
		var url1 = this.input.kcenterurl;
		var url2 = this.input.docsUrl;
		
		return this.composeUrl(url1, url2);
	};
	
	$scope.storeValue = function(key){
		if(key){
			var keyName = key.substring(key.indexOf(".")+1,key.length);
			var value = this.input[keyName];
			$cookieStore.put(key, value);	
		}
	}
	
	
	
	$scope.testConnection = function (input){  
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
              			content: "<h3>"+resultText+"</h3><br><small>URL: "+url	+"</small><br>Status : "+invocation.status
            		})
		    	}
				
		    }
		    invocation.send("gk_userid="+input.userid+"&gk_password="+input.password+"&gk_domain="+(input.domain || "")+"&gk_request=true&action=login");
		
		}
	}


}]) 
.controller('documentsCtrl', ['$scope', 'DocumentService','SingletonDocument', 
function ($scope, DocumentService,SingletonDocument) {
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
	};
	$scope.openDocument = function(docUrl){
		SingletonDocument.openDocument(docUrl);
	}
}]);