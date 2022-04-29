$(document).ready(function(){
  
  // --- Settings ---

  var settings = {
    // Text Settings
    "font" : "CP437_FONT",
    "speed" : 0,
    "brightness" : 0,
    "loop" : 0,
    "verticalscrolling" : false,
    // Sprite Settings
    "duration" : 0,
  };

  // --- Server Requests ---

  // Check if webserver is online

  $.ajax({
    url:'http://5.64.158.166/options',
    type:'OPTIONS',
    success: function() {
      console.log("online");
      $('#server-status').addClass('status-online');
      $('#server-status p').text("Server Online!");
      $('.status-circle').addClass('circle-online');
      $('#server-status').css('display', 'flex');
    },
    error: function() {
      console.log("offline");
      $('#server-status').removeClass('status-online');
      $('#server-status').addClass('status-offline');
      $('#server-status p').text("Sorry :( system offline!");
      $('.status-circle').addClass('circle-offline');
      $('#server-status').css('display', 'flex');
    },
    timeout: 2000 // sets timeout to 4 seconds
  });

  // Get Request
  //$.ajax({
    //url: "http://5.64.158.166/",
    //type: 'GET',
    //success: function(data) {
      //console.log(data);
    //},
    //error: function(e) {
      //console.log(e.message);
    //}
  //});

  // Popup Overlay
  $('#overlay').click(function(){
    $('#overlay').css('display', 'none');
  });

  // Post Request - Sprite
  $('#send-sprite-button').click(function(){
    // Overlay
    $('#overlay').css('display', 'block');
    $('#overlay-sent-text').text("<Sending>");

    // Sprite
    var spritearray = new Array(64);
    var message = spritearray;

    // Get sprite data
    $('#sprite-table tr td').each(function(i) {
      spritearray[i] = this.getAttribute('value');
    });

    //console.log(spritearray);

    var sendData = { Message: message, 
      Settings: 
      { 
        Duration: settings['duration'],
        Brightness: settings['brightness']
      } 
    };

    console.log(sendData);

    $.ajax({
      url:'http://5.64.158.166/api/draw-sprite',
      type:'POST',
      data:JSON.stringify(sendData),
      contentType:'application/json; charset=utf-8',
      contentLength: sendData.length,
      dataType:"json",
      success: function(response) {
        $('#overlay-sent-text').text("<Hello world!>");
        response = JSON.parse(response);
        console.log(response);
      },
      error: function(e) {
        //console.log(e.message);
        $('#overlay-sent-text').text("<Failure To Send>");
        $("#sending-animation-image").attr("src","img/test.gif");
      },
      timeout: 4000 // sets timeout to 4 seconds
    });
})

  // Post Request - Text
  $('#send-message-button').click(function(){
    // Overlay
    $('#overlay').css('display', 'block');
    $('#overlay-sent-text').text("Message Showing On Matrix!");

    // Message
    var message = $('#send-message').val();
    var sendData = { Message: message, 
      Settings: 
      { 
        Font: settings['font'],
        Speed: settings['speed'], 
        Brightness:  settings['brightness'],
        Loop: settings['loop'],
        VerticalScrolling: settings['verticalscrolling']
      } 
    };

    //console.log(sendData);

    $.ajax({
      url:'http://5.64.158.166/api/set-text',
      type:'POST',
      data:JSON.stringify(sendData),
      contentType:'application/json; charset=utf-8',
      contentLength: sendData.length,
      dataType:"json",
      success: function(data) {
        //console.log(data);
        //response = JSON.parse(data);
        console.log(data);
        $('#overlay-sent-text').text("<Hello world!>");
        $('#overlay').css('display', 'none');
      },
      error: function() {
        //console.log(e.message);
        $('#overlay-sent-text').text("<Failure To Send>");
        $("#sending-animation-image").attr("src","img/test.gif");
      },
      timeout: 4000 // sets timeout to 4 seconds
    });
  })

  // --- Draw Sprite Table ----
    
  // Create Table
  var table = $('<table>'); //.addClass('foo');
  var tablerows = 8;
  var tableheaders = 8;

  // Create Table Rows
  for(i=0; i < tablerows; i++){
    var row = $('<tr>'); //.addClass('bar');
    // Create Table Headers
    for(y=0; y < tableheaders; y++){
      var rowdata = $('<td>').text('');//.addClass('actbooive').text('');
      rowdata.attr("value", 0);
      // On Click - Add And Remove 'active class' 
      rowdata.click(function(){
        if(!($(this).hasClass("active"))){
          $(this).removeClass('active');
          $(this).addClass('active');
          this.setAttribute("value", 1);
        } else {
          $(this).removeClass('active');
          this.setAttribute("value", 0);
        } 
      });
      row.append(rowdata)
    }
    table.append(row);
  }

  $('#sprite-table').append(table);

  // --- Settings Sliders ---

  // Get Sliders
  var $range = $('.slider');

  $range.each(function() {
    // Get Thumb
    var $thumb = $(this).next('.range-thumb');
    var rangemax = parseInt(this.max, 10);
    var thumbwidth = 28; // half Thumb width. See CSS

    $(this).on('input input.range', function() {
      var rangewidth = $(this).width();
      var currentvalue = parseInt(this.value, 10);
      var thumbtext = currentvalue; // val >= max ? '∞' : val;
      // Position in PX
      //var xpx = (currentvalue) * (rangewidth - thumbwidth / rangemax);
      var xpx = (currentvalue-1) * ((rangewidth - thumbwidth) / (rangemax-1));
      $thumb.css({left: xpx}).attr("data-val", thumbtext);
      //var xpc = xPX * 100 / w; // Position in % (if ever needed)
      // Insert Slider Settings Value In  Settings Dictionary
      settings[this.id] = currentvalue;
      //console.log(settings[this.id]);
    });

    $range.trigger('input.range');
  });

  $('.slider').trigger("input.range")

  $range.trigger('input.range');
  $(window).on("resize", () => $range.trigger("input.range"));

  // --- Settings Font - Custom Drop Down Menu ---

  let root = document.documentElement;

  var customdropdownmenus, selectElement;
  var customdropdownmenuslength, selectElementLength;
  var selectedmenuitembox, optionslistcontainer, optionitem;
  var i, j;

  // Get elements with the class "font-select" - custom drop down menu
  customdropdownmenus = document.getElementsByClassName("font-select");
  customdropdownmenuslength = customdropdownmenus.length;
  // Loop Through Each Drop Down Menu Element - For the custom drop box element
  for (i = 0; i < customdropdownmenuslength; i++) {
    // Get the select list from custom drop box menu's
    selectElement = customdropdownmenus[i].getElementsByTagName("select")[0];
    selectElementLength = selectElement.length;

    // Create a new DIV that will act as the selected item - top box
    selectedmenuitembox = document.createElement("DIV");
    selectedmenuitembox.setAttribute("class", "select-selected");
    selectedmenuitembox.classList.add(selectElement.options[selectElement.selectedIndex].className);
    selectedmenuitembox.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    customdropdownmenus[i].appendChild(selectedmenuitembox);

    // Create a new DIV container that will contain the new option's list
    optionslistcontainer = document.createElement("DIV");
    optionslistcontainer.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selectElementLength; j++) 
    {
      /* For each option in the original select element, 
      create a new DIV that will act as an option item */
      optionitem = document.createElement("DIV");
      optionitem.setAttribute("class", selectElement.options[j].className);
      optionitem.setAttribute("id", selectElement.options[j].id);
      optionitem.setAttribute("value", selectElement.options[j].value);
      //console.log(optionitem.value);
      optionitem.innerHTML = selectElement.options[j].innerHTML;
      optionitem.addEventListener("click", function(e) 
      {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var selectelement;
          var selectedmenuoption, sameassselectedmenuoption;
          var selectelementlength, sameassselectedmenuoptionlength;
          var i, k;

          // Get parent select element
          selectelement = this.parentNode.parentNode.getElementsByTagName("select")[0];
          selectelementlength = selectelement.length; // number of options
          // Get selected option item - top box
          selectedmenuoption = this.parentNode.previousSibling;
          // For each option in the original select element 
          for (i = 0; i < selectelementlength; i++) {
            if (selectelement.options[i].innerHTML == this.innerHTML) {
              selectelement.selectedIndex = i;
              selectedmenuoption.innerHTML = this.innerHTML;
              // Add selected lass to the top box
              selectedmenuoption.removeAttribute("class");
              selectedmenuoption.classList.add("select-selected");
              selectedmenuoption.classList.add(this.className);
              // Change current font css to match selected option element
              root.style.setProperty('--current-font', this.id);
              // Set message font
              settings["font"] = this.getAttribute('value');
              // Get all options elements in custom select container that have 
              // the "same as the selected" class - Remove class (Highlight)
              sameassselectedmenuoption = this.parentNode.getElementsByClassName("same-as-selected");
              sameassselectedmenuoptionlength = sameassselectedmenuoption.length;
              for (k = 0; k < sameassselectedmenuoptionlength; k++) {
                sameassselectedmenuoption[k].classList.remove("same-as-selected");
              }
              // Add "same as the selected" class
              this.classList.add("same-as-selected")
              break;
            }
          }
          selectedmenuoption.click();
      });
      optionslistcontainer.appendChild(optionitem);
    }
    customdropdownmenus[i].appendChild(optionslistcontainer);
    selectedmenuitembox.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes (drop down menu's),
      and open/close the current select box */
      e.stopPropagation();
      closeAllSelect(this);
      // toggle (add or remove) "select hide" from the custom option container - Hide/show
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var customselectcontainers, customselectedelements;
    var customselectcontainerslength, customselectedelementslength;
    var i;
    var arrNo = [];

    // Get all custom select boxes containers
    customselectcontainers = document.getElementsByClassName("select-items");
    customselectedelements = document.getElementsByClassName("select-selected"); // Top box
    customselectcontainerslength = customselectcontainers.length;
    customselectedelementslength = customselectedelements.length;

    // For each option in the custom container
    for (i = 0; i < customselectedelementslength; i++) {
      if (elmnt == customselectedelements[i]) {
        // if current clicked selected element, add index to the array
        arrNo.push(i)
      } else {
        customselectedelements[i].classList.remove("select-arrow-active");
      }
    }
    // For each option in the custom containers
    for (i = 0; i < customselectcontainerslength; i++) {
      // Returns the position of the first occurrence of a specified value in a string 
      // Returns -1 if 'i' is not in array
      if (arrNo.indexOf(i)) { // [-1 is truthy / 0 is falsy]
        // Add's select to all other custom selects
        customselectcontainers[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  // --- Mobile ---

  $('#swap-containers-text').insertBefore('#swap-containers-sprite');

});
