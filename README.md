Mobile document viewer
==============
This application is used for purpose of testing a KCenter document in mobile device. 

Settings:

![alt text](https://github.com/lukasgal/MobileDocumentViewer/blob/master/docs/img/settings.png "Settings")

Documents:

![alt text](https://github.com/lukasgal/MobileDocumentViewer/blob/master/docs/img/documents.png "Documents")


List of documents is loaded to the application from a location defined in the "Settings". It's required a JSON format like here:
```javascript
[
	{
		"id" 		: "1",
  		"title" 	: "Test document",
  		"url"	 	: "http://nb139.usucz.usu.grp:8080/knowledgecenter/docShowD.do?mandatorKey=MANDATOR_USU&callFromKminer=true&entity.GUID=g4c97f02-12e3-4360-9dg5-73b85b66g84g&mode=mobile"
   },
   	{
		"id" 		: "2",
  		"title" 	: "Test document 2",
  		"url"	 	: "http://nb139.usucz.usu.grp:8080/knowledgecenter/docShowD.do?mandatorKey=MANDATOR_USU&callFromKminer=true&entity.GUID=06374b99-4d39-4625-829d-522414ef9fdc&mode=mobile"
	}
  
]
```

Document view:

![alt text](https://github.com/lukasgal/MobileDocumentViewer/blob/master/docs/img/documentView.png "Documents")

