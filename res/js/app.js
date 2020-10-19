$(document).ready(function() {
    $(".avatar").click(function(){
        $(".dropdown").toggleClass("show");
    });
    
    $(".like-button").on("click", async function(){
        var id = $(this).attr("id");
        $("#" + id).toggleClass("liked");
    });
});

$.get( "https://private-anon-23b167fa18-wad20postit.apiary-mock.com/users/1", function( data ) {
    $( ".result" ).html( data );
    $("#loggedInUserName").append(data.firstname + " " + data.lastname);
    $("#loggedInUserEmail").append(data.email);
    $(".avatar").attr('src', data.avatar);
  });

$.get( "https://private-anon-23b167fa18-wad20postit.apiary-mock.com/posts", function( data ) {
    $( ".result" ).html( data );
    //Looping through the posts
    for(post in data){
        var name = data[post].author.firstname + " " + data[post].author.lastname;
        var avatar = data[post].author.avatar;

        var id = data[post].id;

        var postDate = data[post].createTime;
        var likeAmount = data[post].likes;
        if (data[post].text == null){
            var text = "";
        }else {
            var text = data[post].text;
        }
        if(data[post].media != null){
            if(data[post].media.type == "image"){
                var img = data[post].media.url;
                //Post with image
                $(".main-container").append(`
                <div class="post">
                <div class="post-author">
                <span class="post-author-info">
                <img src="${avatar}" alt="Post author">
                <small>${name}</small>
                </span>
                <small>${postDate}</small>
                </div>
                <div class="post-image">
                <img src="${img}" alt="">
                </div>
                <div class="post-title">
                <h3>${text}</h3>
                </div>
                <div class="post-actions">
                <button id = "${id}" type="button" name="like" class="like-button">${likeAmount}</button>
                </div>
                </div>`);

            } 
            //Presumably if it isn't an image, it's a video
            else {
                var vid = data[post].media.url;
                
                $(".main-container").append(`
                <div class="post">
                <div class="post-author">
                <span class="post-author-info">
                <img src="${avatar}" alt="Post author">
                <small>${name}</small>
                </span>
                <small>${postDate}</small>
                </div>
                <div class="post-video">
                    <video width="100%" height="100%" controls>
                    <source src="${vid}" type="video/mp4">
                    </video>
                </div>
                <div class="post-title">
                <h3>${text}</h3>
                </div>
                <div class="post-actions">
                <button id = "${id}" type="button" name="like" class="like-button">${likeAmount}</button>
                </div>
                </div>`);

            }
        } 
        //Text only post
        else {
            $(".main-container").append(`
            <div class="post">
            <div class="post-author">
            <span class="post-author-info">
            <img src="${avatar}" alt="Post author">
            <small>${name}</small>
            </span>
            <small>${postDate}</small>
            </div>
            <div class="post-title">
            <h3>${text}</h3>
            </div>
            <div class="post-actions">
            <button id = "${id}" type="button" name="like" class="like-button">${likeAmount}</button>
            </div>
            </div>`);
        }
    }
});