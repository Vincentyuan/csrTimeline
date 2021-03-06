var selectedCatalog = [];
var yearStart = -1;
var yearEnd = -1;
var searchContext = "";
var selectdType = [];
var mediaOrNot = [];

$(document).ready(function () {
     $(document).on('mouseover', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").css("display", "block");
    });
     $(document).on('mouseleave', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").css("display", "none");
    });
    $(document).on('click', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").addClass("show");
    });
     $(document).on('click', ".close-btn", function () {
       $(this).parents(".time-detail").removeClass("show");
            $(this).parents(".time-detail").css("display", "none");
    });
        //read json file
        /*
    function loadJson() {
        var jqxhr = $.getJSON("json/test.json", function (json) {
            var list = json.csrDataList;
            var title;
            var year;
            var catalog;
            var author;
            var discription;
            var articalLink;
            var imagePath;
            for (var i = 0; i < list.length; i++) {
                title = list[i].title;
                year = list[i].year;
                catalog = list[i].catalog;
                author = list[i].author;
                discription = list[i].discription;
                articalLink = list[i].articalLink;
                imagePath = list[i].imagePath;

            }
        }).error(function () {
            alert("ajax return error");
        })
    }
    //loadJson();
    */

    initFilterBar();
    loadData();

});

function createElementByEntity(entity){
  var issuedByself = " (Issued by himself)";
  var issuedByOthers = " (Not Issued by himself)";
  var issueStatus = entity.issuedByself==true?issuedByself:issuedByOthers;
  var html = ' <div class="time-block row">'+
                '<div class="col-xs-5 ">'+
                  '<span class="right" style="padding-top: 9px;">' + entity.year + '</span>'+
                ' </div>'+
                '<div class="col-xs-2 "> '+
                  '<div class="time-point center-block" style="background-image: url(./' + entity.imagePath + ');"></div>'+
                '</div>'+
                '<div class="col-xs-5 "> '+
                  '<div class="time-detail"> '+
                    '<p><a href="'+entity.articalLink+'"><span class="title">' + entity.title + '</span></a><span class="right close-btn">X</span></p>'+
                    '<p class="sm">Submitted by: <span class="blue"><a href="'+entity.authorLink+'">' + entity.author + ' </a></span></p> '+
                    '<p class="sm">Categories: <span class="blue">' + entity.catalog + ' </span></p>'+
                    '<p class="sm"> Publisher Domain: <span class="blue">' + entity.authorType +issueStatus+ '</span></p>'+
                    ' <div class="hor-line xs"></div>'+
                    '<div class="description">' + entity.discription + '</div></div> </div> </div>';
  return html;

}
function initFilterBar(){
  var catalogList = getCatalogs();
  for (var i = 0; i < catalogList.length; i++) {
    $("#catalogsTobeSelected").append('<option>'+catalogList[i]+'</option>');
  }
  var typeList = getPublishedType();
  for (var i = 0; i < typeList.length; i++) {
    $("#publishorTobeSelected").append('<option>'+typeList[i]+'</option>');
  }
}

function loadData(){
  var elementList = getRequiredData();
  var sortedList = sortElementByYear(elementList);
  for(var i = 0 ; i < sortedList.length ; i++){
    var html = createElementByEntity(sortedList[i]);
    $(".time-blocks").append(html);
  }
}
function removeAllTimeBlocks(){
  var container = $(".time-blocks");
  container.empty();
}
function filterApply(){
  yearStart = parseInt($("#yearStart")["0"].value) || -1;
  yearEnd =  parseInt($("#yearEnd")["0"].value) ||-1;
  searchContext = $("#searchText")["0"].value;
  selectedCatalog = getSelectValues($("#catalogsTobeSelected"));
  selectdType = getSelectValues($("#publishorTobeSelected"));
  mediaOrNot = getSelectValuesFromCheckBox();
  removeAllTimeBlocks();
  loadData();
}
function clearFilter(){
  //window.location.reload();

  $("#yearStart")["0"].value = "";
  $("#yearEnd")["0"].value = "";
  $("#searchText")["0"].value = "";
  cancelSeleced($("#catalogsTobeSelected"));

  cancelSelecedBox();

  removeAllTimeBlocks();
  initFilterBar();
  initGlobalVariavle();
  loadData();

}
function getSelectValues(select) {
  var result = [];
  var options = select && select["0"].options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
function cancelSeleced(select){
  select.selectpicker("deselectAll");
}
function initGlobalVariavle(){
    selectedCatalog = [];
    yearStart = -1;
    yearEnd = -1;
    searchContext = "";
}
function sortElementByYear(entityLists){
    var len = entityLists.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (entityLists[j].year > entityLists[j+1].year) {        //compare
                var temp = entityLists[j+1];        //swap
                entityLists[j+1] = entityLists[j];
                entityLists[j] = temp;
            }
        }
    }
    return entityLists;
}
function saveAuthorTolocal(){
  var authors = getPublished();
  var str = '';
  for (var i = 0; i < authors.length; i++) {
    str+='-'+authors[i];
  }
  localStorage.setItem('author3', str);
  alert("finished");
}

function getSelectValuesFromCheckBox(){
  var medias = [];
  if (document.getElementById("Media").checked == true)
  {
    //medias.push($('#NonMedia').val());
    medias.push("Media");
  }else if(document.getElementById("Media").checked == false){
    medias.push("NonMedia");
  }
  // if (document.getElementById("NotMedia").checked == true)
  // {
  //   //medias.push($('#Media').val());
  //   medias.push("NonMedia");
  // }
  return medias;
}
function cancelSelecedBox(){
  //document.getElementById("Media").setAttribute("unchecked","");
  document.getElementById("Media").checked=false;
  //document.getElementById("NotMedia").checked=false;
  //document.getElementById("NonMedia").setAttribute("unchecked","");
}
