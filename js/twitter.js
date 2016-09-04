//var upload_url="http://localhost:5000/follow/bulk/csv"; // for dev
//var populate_data="http://localhost:5000/follow/bulk";// for dev
var upload_url="http://dataminingmedia.com:5050/follow/bulk/csv"; // for server
var populate_data="http://dataminingmedia.com:5050/follow/bulk";

$(document).ready(function() {
  $("#upload").click(function(){
        var form_data = new FormData($('#upload-file')[0]);
form_data.append("job_name",document.getElementById("job_name").value);
        $.ajax({
            type: 'POST',
            url: upload_url,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: false,
            success: function(data) {
            	if (data.substring(0,1)== "#") {
            	        alert(data);
                		hideSpan('success');
					    showSpan('fail');

				}
				else {
                    document.getElementById('selectFile').value="";
                	document.getElementById('job_name').value="";
					showSpan('success');
					hideSpan('fail');
                    var dataToPopulate="";
                    var obj = JSON.parse(data);

                   for(var i=0;i<obj.length;i++)
                   {

                   dataToPopulate=dataToPopulate+"<div class='twitter-follow-bulk-users-row-2 w-row'><div class='w-col w-col-1'>"
                  +"<div>"+(i+1)+"</div>"
                +"</div>"
                +"<div class='w-col w-col-4'>"
                  +"<div>"+obj[i].jobName+"</div>"
                +"</div>"
                +"<div class='w-col w-col-1'>"
                  +"<div>"+obj[i].created_on+"</div>"
                +"</div>"
                +"<div class='w-col w-col-1'>"
                 +" <div>"+obj[i].updated_on+"</div>"
                +"</div>"
                +"<div class='w-col w-col-3'>"
                 +" <div class='w-row'>"
                    +"<div class='w-col w-col-4'>"
                   +"   <div>"+obj[i].completed+"</div>"
                   +" </div>"
                  +"  <div class='w-col w-col-4'>"
                    +"  <div>"+obj[i].failed+"</div>"
                    +"</div>"
                   +" <div class='w-col w-col-4'><div>"+obj[i].entries+"</div></div></div></div><div class='w-col w-col-2'><div>"+obj[i].status+"</div></div></div>";
                   }

  document.getElementById('populateData').innerHTML=dataToPopulate;


				}
            },
        });

});
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function hideSpan(field) {

	var hideSpanArea = document.getElementById(field);
	hideSpanArea.style.display = "none";
}

function showSpan(field) {

	var hideSpanArea = document.getElementById(field);
	hideSpanArea.style.display = "block";

}


function populateData(){


            var form_data = new FormData();
            $.ajax({
                crossOrigin: true,
                type: 'POST',
                url: populate_data,
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                async: false,
                success: function(data) {

                    var dataToPopulate="";
                    var obj = JSON.parse(data);

                   for(var i=0;i<obj.length;i++)
                   {
                   dataToPopulate=dataToPopulate+"<div class='twitter-follow-bulk-users-row-2 w-row'><div class='w-col w-col-1'>"
                  +"<div>"+(i+1)+"</div>"
                +"</div>"
                +"<div class='w-col w-col-4'>"
                  +"<div>"+obj[i].jobName+"</div>"
                +"</div>"
                +"<div class='w-col w-col-1'>"
                  +"<div>"+obj[i].created_on+"</div>"
                +"</div>"
                +"<div class='w-col w-col-1'>"
                 +" <div>"+obj[i].updated_on+"</div>"
                +"</div>"
                +"<div class='w-col w-col-3'>"
                 +" <div class='w-row'>"
                    +"<div class='w-col w-col-4'>"
                   +"   <div>"+obj[i].completed+"</div>"
                   +" </div>"
                  +"  <div class='w-col w-col-4'>"
                    +"  <div>"+obj[i].failed+"</div>"
                    +"</div>"
                   +" <div class='w-col w-col-4'><div>"+obj[i].entries+"</div></div></div></div><div class='w-col w-col-2'><div>"+obj[i].status+"</div></div></div>";
                   }

                document.getElementById('populateData').innerHTML=dataToPopulate;




                },
            });
    }