hostUrl = "http://127.0.0.1:5000/";

var content_file = 0;
var style_file = 0;

$( document ).ready(function() {
    $("#content-sel-btn").click(onClick_ContentSelBtn);
    $("#content-upload-btn").click(onClick_ContentUploadBtn);
    $("#style-sel-btn").click(onClick_StyleSelBtn);
    $("#style-upload-btn").click(onClick_StyleUploadBtn);
    $("#start-btn").click(onClick_StartBtn);
    $("#ctrl-alert").hide();
    $("#content-file-input").change(contentFile_Handler);
    $("#style-file-input").change(styleFile_Handler);
})

// Helper Functions
function showErrorAlert(s) {
    if($("#ctrl-alert").is(":hidden")) {
        $("#ctrl-alert").removeClass("alert-info");
        $("#ctrl-alert").addClass("alert-danger");
        $("#ctrl-alert").text(s);
        $("#ctrl-alert").show();
        setTimeout(() => {$("#ctrl-alert").fadeOut('500');}, 2000);
    }
}

function showInfoAlert(s) {
    if($("#ctrl-alert").is(":hidden")) {
        $("#ctrl-alert").removeClass("alert-danger");
        $("#ctrl-alert").addClass("alert-info");
        $("#ctrl-alert").text(s);
        $("#ctrl-alert").show();
        setTimeout(() => {$("#ctrl-alert").fadeOut('500');}, 2000);
    }
}

function getSizeConfig(s) {
    var size = 0;
    if (s == 'lg') 
        size = 512;
    else if (s == 'sm') 
        size = 128;
    else
        showErrorAlert("Wrong size selection");
    return size;
}

// Input State Handler
function contentFile_Handler(e) {
    content_file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $('#content-img-view').attr('src', e.target.result);
        $('#content-img-view').hide();
        $('#content-img-view').fadeIn(500);
        $("#content-img-name").text(content_file.name);
    }
    reader.readAsDataURL(content_file);
}

function styleFile_Handler(e) {
    style_file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $('#style-img-view').attr('src', e.target.result);
        $('#style-img-view').hide();
        $('#style-img-view').fadeIn(500);
        $("#style-img-name").text(style_file.name);
    }
    reader.readAsDataURL(style_file)
}

// Image Select Area
function onClick_ContentSelBtn() {
    $('#content-file-input').trigger('click');      
}

function onClick_ContentUploadBtn() {
    $("#content-img-name").text("Uploading!");  
}

function onClick_StyleSelBtn() {
    $('#style-file-input').trigger('click');    
}

function onClick_StyleUploadBtn() {
    $("#style-img-name").text("Uploading!");  
}

function onClick_StartBtn() {
    if(!content_file || !style_file) {
        showErrorAlert("You need to select two photos first");
        return;
    }

    // Get files ready
    // Send size
    var fd = new FormData();
    var size = getSizeConfig($("#size-options .btn input:checked").val());

    fd.append('origin', content_file);
    fd.append('style', style_file);
    fd.append('size', size);

    $.ajax({
        url: hostUrl + 'transfer',
        method: "POST",
        data: fd,
        contentType: false,
        processData: false,
        success: function (data,status,xhr) {
            showInfoAlert("Converting succeed! Info:" + xhr);
            console.log("data:" + data + " type:" + typeof(data))
            console.log(status)
            console.log(xhr)
            console.log(xhr.body)
            $('#start-btn').attr("disabled", false);

            // var reader = new FileReader();
            // reader.onload = function(e) {
            //     $('#result-img-view').attr('src', e.target.result);
            //     $('#result-img-view').hide();
            //     $('#result-img-view').fadeIn(500);
            // }
            // reader.readAsDataURL(data);
            $('#result-img-view').attr('src', "data:image/jpg;base64," + data + "");
            // $('#result-img-view').hide();
            // $('#result-img-view').fadeIn(500);
            
        },
        error: function (response) {
            showErrorAlert("Error fail! Info:" + response.responseText);
            $('#start-btn').attr("disabled", false);
        }
    })

    $(this).text("Processing");
    $(this).attr("disabled", true);
}

