
{   
    
   let createPost = function(){
       let newPostForm = $("#new-post-form");
       newPostForm.submit(function(e){
           e.preventDefault();
           
           $.ajax({
               type:'post',
               url:'/posts/create',
               data:newPostForm.serialize(),
               success:function(data){
                new Noty({
                    theme:'relax',
                    text: data.success,
                    type:'success',
                    layout:'topRight',
                    timeout: 1500
                    
                    }).show();
                    
                    
                    let newPost = newPostDom(data.data.post)
                    $("#post-list-container>ul").prepend(newPost);
                    
                    deletePost($(" .delete-post", newPost));
                    
                    new postComments(data.data.post._id);
                    new ToggleLike($(' .post-like',newPost));
                    
                    
                    
               },
               error: function(err){
                   console.log(err.responseText);
               }
           })
       })
   } 

   let newPostDom = function(post){
       
       return $(`
           <li id="post-${post._id}">
                <div>${post.user.name}</div>  
                <div id="post-content">
                    <div>${post.content}</div>
               
                   
                        <a class="post-like" data-like = ${post.like.length} href="/likes/toggle/?id=${post._id}&type=Post">
                            0 Likes
                        </a>
                    
                        
                    
                    <a href="/posts/destroy/${post._id}" class="delete-post">X</a>
               
               
                </div>   
       
                <div>
           
                    <form action="/comments/create" method="POST" class="post-comments">
                        <input type="text" name="content" placeholder="Type you comment Here">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Submit">
                    </form>
                    <div class="post-comment-continer">
                    <ul id="post-comment-list-${post._id}">
                        
                    </ul>
                </div>
           
                </div>
            </li>`)
   }
   
   
    let deletePost = function(deleteLink){
        
        $(deleteLink).click(function(e){
            
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success:function(data){

                    new Noty({
                        theme:'relax',
                        text: data.message,
                        type:'success',
                        layout:'topRight',
                        timeout: 1500
                        
                        }).show();
                    
                    $(`#post-${data.data.post_id}`).remove();
                    
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })  
        
   }

   

    
 
   
   let convertPostsToAjax = function(){
       
    $('#post-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post', self);
        
        deletePost(deleteButton);

        let postId = self.prop("id").split("-")[1];
        
        new postComments(postId);
    })
}
   
   createPost()
   convertPostsToAjax();
   
   }

  
   
   
