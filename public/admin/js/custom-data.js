
function getCurrentUrl(){
    var current_url = window.location.href;
    current_url = current_url.split("/");
    var new_url = current_url[0]+'//'+current_url[2]+'/'+current_url[3];
    return new_url;
}
function showNotify(message,status,url){
    if(status == 'success'){
        toastr.success(message);
        setTimeout(function(){
            window.location = url;
        }, 2000);
    }else if(status == 'error'){
        toastr.error(message);
    }else if(status == 'errors'){
        toastr.error(message);
    }
}

$(document).on("submit",'.all-form',function(e){
	e.preventDefault();
	var method = $(this).attr('method');
	var url = $(this).attr("action");
    var form = $(this)[0];
    var form_data = new FormData(form);   
	$.ajax({
        type: method,
        url: url,
        data:form_data,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data){
            if(data.status == 'error'){
                showNotify(data.message,data.status,'');
            }
            if(data.status == 'success'){
                showNotify(data.message,data.status,data.url);
            }
            if(data.status == 'errors'){
                showNotify(data.message,data.status,data.url);
            }
        }
    }); 
})
$(document).on('keyup','input', function () { 
    $(this).parent().find('.text-danger').empty();
});

$(document).on('change','.send-to-server', function (e) { 
    var id = $(this).data('id');
    var url = $(this).attr("url");
    $.ajax({
        type: 'POST',
        url: url,
        data:$(this).serialize(),
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
                showNotify(data.message,data.status,data.url);
            }
            if(data.status == 'errors'){
                showNotify(data.message,data.status,data.url);
            }
        }
    }); 
});
$(document).on('change','.get-dynamic-html', function (e){
    var id = $(this).val();
    var url = $(this).attr("url");
    var wrapper = $(this).data("wrapper");
    $.ajax({
        type: 'POST',
        url: url,
        data:{id:id},
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
               $(wrapper).html(data.html); 
            }
        }
    }); 
})
$(document).on("click",'.send-to-server-dynamic-html',function(e){
    e.preventDefault();
    var classData = $(this);
    var id = $(".category_id").val();
    var url = classData.attr("url");
    var wrapper = classData.data("wrapper");
    $.ajax({
        type: 'POST',
        url: url,
        data:{id:id},
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
               $(".send-to-server-dynamic-html").removeClass('active');
               classData.addClass('active');
               $(wrapper).html(data.html); 
            }
        }
    }); 
})
$(document).on("click",".next",function(e){
    e.preventDefault();
    var tab = $(this).data("tab");
    var tabview = $(this).data("tabview");
    var currenttab = $(this).data("currenttab");
    var currenttabview = $(this).data("currenttabview");
    var url = $(this).attr("url");
    var form = $(".all-form")[0];
    var form_data = new FormData(form); 
    $.ajax({
        type: 'POST',
        url: url,
        data:form_data,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data){
            if(data.status == 'error'){
                $.each(data.errors, function(key, value) {
                    $('#' + key).addClass('is-invalid');

                    $('#' + key).html(value);
                });  
            }
            if(data.status == 'success'){  
                $(currenttab).removeClass("active");
                $(currenttabview).removeClass("show active");
                $(tab).addClass("active");
                $(tabview).addClass("show active");
                if(currenttab == '.seo'){
                    $(".course-preview").html(data.html);
                }
                if(tab == '.finish'){
                    setTimeout(function(){
                        window.location = data.url;
                    }, 3000);
                }
            }
            if(data.status == 'errors'){
                toastr.error(data.message);
            }
        }
    }); 
});
$(document).on("click",".add-requirements",function(e){
    e.preventDefault();
    var requirement = $(".requirement").val();
    var html = '<li><input type="hidden" name="requirement_data[]" value="'+requirement+'"> '+requirement+'</li>';
    $(".bind-requirements").append(html);
    $(".requirement-data").val('');
});
$(document).on("click",".add-more-heading-feature",function(e){
    var mainHTML = $(".main-wrapper-for-heading-feature").html();
    $(".new-wrapper-for-heading-feature").append(mainHTML);
    $(".delete-html-btn").hide();
});
$(document).on("change",".course-provider",function(e){
    var course_provider = $(this).val();
    var inputHTML = '';
    if(course_provider == 1){
        inputHTML = '<label>Video ID</label><input type="text" class="form-control" placeholder="Video ID" name="video_id">';
    }else{
        inputHTML = '<label>Upload Video</label><input type="file" class="form-control" name="video_file">';
    }
    $(".media-inputs").html(inputHTML);
});
$(document).on("click",".previous",function(e){
    e.preventDefault();
    var previoustab = $(this).data("previoustab");
    var previoustabview = $(this).data("previoustabview");
    var currenttab = $(this).data("currenttab");
    var currenttabview = $(this).data("currenttabview");
    $(currenttab).removeClass("active");
    $(currenttabview).removeClass("show active");
    $(previoustab).addClass("active");
    $(previoustabview).addClass("show active");
});
$(document).on('click','.delete-data', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var url = $(this).attr('url');
    Swal.fire({
        title: "Are you sure ?",
        text: "You want to delete the data",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
            type: "POST",
            url: url,
            data:{id:id},
            dataType: 'json',
            success: function(data){
                if(data.status == 'success'){
                    showNotify(data.message,data.status,data.url);
                }
                if(data.status == 'errors'){
                    showNotify(data.message,data.status,data.url);
                }
            }
        }); 
      } else if (result.isDenied) {
       showNotify('Action Cancelled','error','');
      }
    }); 
});
$(document).on('change','.show-content-type-data',function(e){
    var content_type = $(this).val();
    var html = '';
    if(content_type == 'video_url'){
        html += '<label>Video URL</label><input type="text" class="form-control" placeholder="Video URL" name="video_url">';
    }else if(content_type == 'video_upload'){
        html += '<label>Video Upload</label><input type="file" class="form-control" name="video_upload">';        
    }else if(content_type == 'audio_upload'){
        html += '<label>Audio Upload</label><input type="file" class="form-control" name="audio_upload">';        
    }else if(content_type == 'audio_url'){
        html += '<label>Audio URL</label><input type="text" class="form-control" name="audio_url" placeholder="Audio URL">';        
    }else if(content_type == 'document_upload'){
        html += '<label>Document Upload</label><input type="file" class="form-control" name="document_upload">';        
    }else if(content_type == 'document_url'){
        html += '<label>Document URL</label><input type="text" class="form-control" name="document_url" placeholder="Document URL">';        
    }else if(content_type == 'image_url'){
        html += '<label>Image URL</label><input type="text" class="form-control" name="image_url" placeholder="Image URL">';        
    }else if(content_type == 'image_upload'){
        html += '<label>Image URL</label><input type="file" class="form-control" name="image_upload">';        
    }else if(content_type == 'iFrame'){
        html += '<label>Image URL</label><input type="text" class="form-control" name="iframe_url" placeholder="Link for IFrame">';        
    }
    $(".content-type-input").html(html);
});
$(document).on("click",".show-content-data",function(e){
    e.preventDefault();
    var id = $(this).data("id");
    var wrapper = $(this).data("wrapper");
    var modal = $(this).data("modal");
    var base_url = getCurrentUrl();
    $.ajax({
        type: "POST",
        url: base_url+'/show-content-data',
        data:{id:id},
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
                $(modal).modal('show');
                $(wrapper).html(data.html);
            }
        }
    }); 
});
$(document).on("click",".search-courses",function(e){
    e.preventDefault();
    var text = $(".search_course").val();
    if(text != ''){
        text = text.replace(/\s+/g, '-').toLowerCase();
        var base_url = getCurrentUrl();
        window.location = base_url+'/course?search='+text;
    }else{
        $("#search-error").html('Please give any keyword')
    }
});
$(document).on("change",".property_kind",function(e){
    var property_kind = $(this).val();
    var html = '';
    if(property_kind == 'Residential'){
        $(".hospitality_kind").empty();
        html += '<div class="row mb-3"><div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Flat/Apartment" id="success-outlined-1">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-1" style="font-size: 10px;">Flat/Apartment</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Independent House / Villa" id="success-outlined-2">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-2" style="font-size: 10px;">Independent House / Villa</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Independent / Builder Floor" id="success-outlined-3">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-3" style="font-size: 10px;">Independent / Builder Floor</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Plot / Land" id="success-outlined-4">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-4" style="font-size: 10px;">Plot / Land</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="1 RK/ Studio Apartment" id="success-outlined-5">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-5" style="font-size: 10px;">1 RK/ Studio Apartment</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Serviced Apartment" id="success-outlined-6">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-6" style="font-size: 10px;">Serviced Apartment</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Farmhouse" id="success-outlined-7">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-7" style="font-size: 10px;">Farmhouse</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check" name="property_kind_type" value="Other" id="success-outlined-8">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-8" style="font-size: 10px;">Other</label></div></div></div>';
    }else{
        html += '<div class="row mb-3"><div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Office" id="success-outlined-8">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-8"  style="font-size: 10px;">Office</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Retail" id="success-outlined-9">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-9"  style="font-size: 10px;">Retail</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Plot / Land" id="success-outlined-10">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-10"  style="font-size: 10px;">Plot / Land</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Storage" id="success-outlined-11">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-11"  style="font-size: 10px;">Storage</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Industry" id="success-outlined-12">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-12"  style="font-size: 10px;">Industry</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Hospitality" id="success-outlined-13">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-13"  style="font-size: 10px;">Hospitality</label></div></div>';
        html += '<div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
        html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="property_kind_type" value="Other" id="success-outlined-14">';
        html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-14"  style="font-size: 10px;">Other</label></div></div></div>';
    }
    $(".property_kind_type").html(html);
});
$("body").on("change",".hospitality_kind_per_property",function(e){
    var html = '';
    html += '<div class="row mb-3"><label for="mobile" class="form-label">What kind of hospitality is it?</label><div class="col-md-3"><div class="hstack gap-2 flex-wrap">';
    html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="hospitality_kind_per_property" value="Hotel/Resorts" id="success-outlined-15">';
    html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-15"  style="font-size: 10px;">Hotel/Resorts</label></div></div>';
    html += '<div class="col-md-10"><div class="hstack gap-2 flex-wrap">';
    html += '<input type="radio" class="btn-check hospitality_kind_per_property" name="hospitality_kind_per_property" value="Guest-House/Banquet-Halls" id="success-outlined-16">';
    html += '<label class="btn btn-outline-success btn-rounded" for="success-outlined-16"  style="font-size: 10px;">Guest-House/Banquet-Halls</label></div></div></div>';
    $(".hospitality_kind").html(html);
})
$(document).on("click",'.add-built-area',function(e){
    e.preventDefault();
    var html = '';
    html += '<div class="row mb-3">';
    html += '<div class="col-md-4"><label for="property_kins" class="form-label">Built-up Area</label><input type="text" class="form-control" name="built_area" placeholder="Built-up Area">';
    html += '</div><div class="col-md-2"><label for="property_kins" class="form-label">Unit</label><select class="form-select mb-3" aria-label="Unit" name="built_unit">';
    html += '<option value="sq.ft.">sq.ft.</option><option value="sq.yards">sq.yards</option><option value="sq.m.">sq.m.</option><option value="acres">acres</option><option value="marla">marla</option>';
    html += '<option value="cents">cents</option><option value="bigha">bigha</option><option value="kottah">kottah</option>';
    html += '<option value="kanal">kanal</option><option value="grounds">grounds</option><option value="ares">ares</option><option value="biswa">biswa</option>';
    html += '<option value="guntha">guntha</option><option value="aankdam">aankdam</option><option value="hectares">hectares</option><option value="rood">rood</option><option value="chataks">chataks</option>';
    html += '<option value="perch">perch</option></select>';
    html += '</div>';
    $(".builtup-super").append(html);
    $(this).hide();
});
$(document).on("click",'.add-super-built-area',function(e){
    e.preventDefault();
    var html = '';
    html += '<div class="row mb-3">';
    html += '<div class="col-md-4"><label for="property_kins" class="form-label">Super Built-up Area</label><input type="text" class="form-control" name="super_built_area" placeholder="Super Built-up Area">';
    html += '</div><div class="col-md-2"><label for="property_kins" class="form-label">Unit</label><select class="form-select mb-3" aria-label="Unit" name="super_built_unit">';
    html += '<option value="sq.ft.">sq.ft.</option><option value="sq.yards">sq.yards</option><option value="sq.m.">sq.m.</option><option value="acres">acres</option><option value="marla">marla</option>';
    html += '<option value="cents">cents</option><option value="bigha">bigha</option><option value="kottah">kottah</option>';
    html += '<option value="kanal">kanal</option><option value="grounds">grounds</option><option value="ares">ares</option><option value="biswa">biswa</option>';
    html += '<option value="guntha">guntha</option><option value="aankdam">aankdam</option><option value="hectares">hectares</option><option value="rood">rood</option><option value="chataks">chataks</option>';
    html += '<option value="perch">perch</option></select>';
    html += '</div>';
    $(".builtup-super").append(html);
    $(this).hide();
});
$(document).on("change",'.furnishing_value',function(e){
    e.preventDefault();
    var furnishing_type = $(this).val();
    var html ='';
    if(furnishing_type == 'Furnishing' || furnishing_type == 'Semi-Furnishing'){
        $(".add-dynamic-furnishing-type").addClass("furnishing-type");
        $(".add-dynamic-furnishing-type").css("display","block");
    }else{
        $(".add-dynamic-furnishing-type").removeClass("furnishing-type");
        $(".add-dynamic-furnishing-type").css("display","none");
    }
})