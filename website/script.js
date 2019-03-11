$( document ).ready(function() {
    $("#content-sel-btn").click(onClick_ContentSelBtn);
    $("#content-upload-btn").click(onClick_ContentUploadBtn);
    $("#style-sel-btn").click(onClick_StyleSelBtn);
    $("#style-upload-btn").click(onClick_StyleUploadBtn);
    $("#size-options .btn").on('click', onClick_SizeOptions);
    $("#start-btn").click(onClick_StartBtn);
    $("#ctrl-alert").hide();
})

// Image Select Area
function onClick_ContentSelBtn() {
    $("#content-img-name").text("Selected!");    
}

function onClick_ContentUploadBtn() {
    $("#content-img-name").text("Uploading!");  
}

function onClick_StyleSelBtn() {
    $("#style-img-name").text("Selected!");   
}

function onClick_StyleUploadBtn() {
    $("#style-img-name").text("Uploading!");  
}

function onClick_StartBtn() {
    $(this).text("Processing");
    $(this).addClass("disabled");
}

// Transfer Control Panel
function onClick_SizeOptions() {
    var val = $(this).find('input').val();
    $("#ctrl-alert").text(val);
    $("#ctrl-alert").show();
    setTimeout(()=>{
        $("#ctrl-alert").hide();
    }, 3000);
}



