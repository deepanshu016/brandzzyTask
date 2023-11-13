<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Backup Page</title>
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
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-4">
                <a href="{{ route('urls.forms') }}" class="btn btn-primary">Go Back</a>
            </div>
            <div class="col-md-4">
                <a href="javascript:void();" class="btn btn-primary take-backup-of-db">Generate Backup</a>
            </div>
        </div>
    </div>
    <div class="row">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Backup File </th>
                <th scope="col">Backup Time</th>
            </tr>
            </thead>
            <tbody>
            @if(!empty($backUpList))
                @foreach($backUpList as $backUp)
                    <tr>
                        <th scope="row">{{ $loop->iteration }}</th>
                        <td><a href="{{ url('storage/app/Laravel/').'/'.$backUp->backup_file }}" download>{{ $backUp->backup_file }}</a></td>
                        <td>{{ $backUp->backup_time }}</td>
                    </tr>
                @endforeach
            @endif
            </tbody>
        </table>
    </div>
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
    $(document).on("click",'.take-backup-of-db',function(e){
        e.preventDefault();
        var requestData = {
                _token: "{{ csrf_token() }}", // Include the CSRF token
            // Add other data as needed
        };
        $.ajax({
            type: 'POST',
            url: "{{ route('urls.backup') }}",
            data: requestData,
            dataType: 'json',
            error: function(xhr, status, error) {
                showNotify(error,'error','');
            },
            beforeSend: function() {
                $('#loader-container').show();
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
