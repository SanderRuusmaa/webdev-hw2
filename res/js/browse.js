$(document).ready(function() {
    $(".avatar").click(function(){
        $(".dropdown").toggleClass("show");
    });
    
    $(".follow").on("click",function(){
        var id = $(this).attr("id");
        $("#" + id).toggleClass("followed");
        if($this.hasClass('followed')){
            $this.text('Followed');         
        } else {
            $this.text('Follow');
        }
    });
});

$.get( "https://private-anon-23b167fa18-wad20postit.apiary-mock.com/users/1", function( data ) {
    $( ".result" ).html( data );
    $("#loggedInUserName").append(data.firstname + " " + data.lastname);
    $("#loggedInUserEmail").append(data.email);
    $(".avatar").attr('src', data.avatar);
  });

$.get("https://private-anon-17c67b4d9c-wad20postit.apiary-mock.com/profiles", function( data ) {
    $( ".result" ).html( data );
    for(profile in data){
        var name = data[profile].firstname + " " + data[profile].lastname;
        var avatar = data[profile].avatar;
        $(".profile-container").append(`
        <div class="profile">
        <img src="${avatar}" alt="">
        <p class = "name">${name}</p>
        <button id = "${profile}" class="follow">Follow</button>
        </div>`);
    }
});