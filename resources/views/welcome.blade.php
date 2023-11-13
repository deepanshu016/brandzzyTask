<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Forms Submit</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('public/admin/css/toastr.css') }}">
    <link rel="stylesheet" href="{{ asset('public/admin/css/style.css') }}">
</head>
<body>
<div id="loader-container" style="display: none;">
    <div class="spinner spinner-wrapper">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <a href="{{ route('url.backups') }}" class="btn btn-primary">Backups</a>
        </div>
    </div>
    <form class="all-form" method="POST" action="{{ route('urls.forms') }}">
    @csrf
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control"  placeholder="First Name" name="first_name">
                        <span id="first_name" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  placeholder="Last Name" name="last_name">
                        <span id="last_name" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control"  placeholder="Email" name="email">
                        <span id="email" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Mobile</label>
                        <input type="text" class="form-control"  placeholder="Mobile" name="mobile">
                        <span id="mobile" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="{{ asset('public/admin/js/toastr.js') }}"></script>
<script>
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
            beforeSend: function() {
                $('#loader-container').show();
            },
            error: function(xhr, status, error) {
                if (xhr.status === 422) {
                    $('#loader-container').hide();
                    var errors = xhr.responseJSON.errors;
                    $.each(errors, function(index, errorMessage) {
                        $("#"+index).html(errorMessage);
                    });
                }
            },
            success: function(data){
                $('#loader-container').hide();
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
</script>
</body>
</html>
