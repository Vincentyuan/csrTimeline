//functions should be here

function getRequiredData(){//yearStart, yearEnd, catalog,searchText){
//get data according to user choose.
//check all the parameter if parameter is null then ignore , if not null then apply the filter.
//loop all the entry in the list
	var requestElement = [];
	for(var i = 0; i < csrDataList.length;i++){
		if(isValidEntry(csrDataList[i])){
			requestElement.push(csrDataList[i]);
		}
	}
	return requestElement;
}

function isValidEntry(entity){//entity,yearStart,yearEnd,catalog,searchText){
//check the entry is valid or not if yes then return true;
	var isYearValid = true;
	var isCatalogValid = true;
	var isSearchValid = true;
	//var isValidPublishedType = true;

	if (selectdType.length == 0 || selectdType.indexOf(entity.authorType)> -1) {
		//check catalog valid
		if(selectedCatalog.length > 0){
			var currentNodeCatalog = false;
			if(typeof entity.catalog == "object"){
				// for (var i = 0; i < entity.catalog.length; i++) {
				// 	if(selectedCatalog.indexOf(entity.catalog[i])> -1){
				// 		currentNodeCatalog = true;
				// 	}
				// }
				for (var i = 0; i < selectedCatalog.length; i++) {
					for (var j = 0; j < entity.catalog.length; j++) {
						if(entity.catalog[j].indexOf(selectedCatalog[i])> -1){
							currentNodeCatalog = true;
						}
					}
				}
			}else if (selectedCatalog.indexOf(entity.catalog)> -1) {
				currentNodeCatalog = true;
			}else {
				currentNodeCatalog = false;
			}
			isCatalogValid = currentNodeCatalog;
		}
		//check year duration valid
		if(yearStart != -1 || yearEnd != -1){
			var currentNodeYear = false;
			if( yearStart != -1 && yearEnd != -1){
				if(entity.year >= yearStart && entity.year <= yearEnd){
					currentNodeYear = true;
				}else{
					currentNodeYear = false;
				}

			}else {
				if((yearStart != -1 && entity.year >= yearStart)||(yearEnd != -1 && entity.year <= yearEnd)){
					currentNodeYear = true;
				}else {
					currentNodeYear = false;
				}
			}
			isYearValid = currentNodeYear;
		}
		//check searchtext
		if(searchContext != null){
			if(entity.discription.indexOf(searchContext)>-1){
				isSearchValid = true;
			}else{
				isSearchValid = false;
			}
		}
		return isYearValid&&isCatalogValid&&isSearchValid;
	}else {
		return false;
	}

}
//some functions for the filter
function getCatalogs(){
	var catalogs = [];
	for (var i = 0; i < csrDataList.length; i++) {
		if(typeof (csrDataList[i].catalog) == 'object'){
			var currentCatalogs = csrDataList[i].catalog;
			for (var j = 0; j < currentCatalogs.length; j++) {
				if(catalogs.indexOf(currentCatalogs[j])<0){
					catalogs.push(currentCatalogs[j]);
				}
			}
		}else if (catalogs.indexOf(csrDataList[i].catalog) < 0) {
			catalogs.push(csrDataList[i].catalog);
		}
	}
 return catalogs;
}
function getPublished(){
	var catalogs = [];
	for (var i = 0; i < csrDataList.length; i++) {
		if(typeof (csrDataList[i].author) == 'object'){
			var currentCatalogs = csrDataList[i].author;
			for (var j = 0; j < currentCatalogs.length; j++) {
				if(catalogs.indexOf(currentCatalogs[j])<0){
					catalogs.push(currentCatalogs[j]);
				}
			}
		}else if (catalogs.indexOf(csrDataList[i].author) < 0) {
			catalogs.push(csrDataList[i].author);
		}
	}
 return catalogs;
}
function getPublishedType(){
	var catalogs = [];
	for (var i = 0; i < publishedTypeList.length; i++) {
		if(catalogs.indexOf(publishedTypeList[i].authorType)<0){
			catalogs.push(publishedTypeList[i].authorType);
		}
	}
 return catalogs;
}
function objCopy(obj){
	return $.extend({}, obj);
}
