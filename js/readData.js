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

function isValidEntry(){//entity,yearStart,yearEnd,catalog,searchText){
//check the entry is valid or not if yes then return true;
	return true;
}
//some functions for the filter
function getCatalogs(){

}
function objCopy(obj){
	return $.extend({}, obj);
}
