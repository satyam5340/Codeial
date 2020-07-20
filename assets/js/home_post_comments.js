class postComments{

    constructor(postId){
        
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentsForm = $(' .post-comments',this.postContainer);

        this.createComment(postId);
        let self = this;
        
        $(" .delete-comment-button",this.postContainer).each(function(){
            
            self.deleteComment($(this));
        })
    }

    createComment(postId){
        let pSelf = this;

        pSelf.newCommentsForm.submit(function(e){
            e.preventDefault();

            let self = this;
            
            
            

            $.ajax({
                type:"post",
                url:"/comments/create",
                data:$(self).serialize(),
                success:function(data){
                    new Noty({
                        theme:'relax',
                        text: data.message,
                        type:'success',
                        layout:'topRight',
                        timeout: 1500
                        
                        }).show();
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    console.log(`#post-comment-list-${postId}`,"kiii");
                    console.log(document.getElementById(`post-comment-list-${postId}`))
                    $(`#post-comment-list-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(" .delete-comment-button",newComment));

                    
                }
            })
        })
    }

    newCommentDom(comment){
        console.log("called");
        return $(`<li id="comment-${comment._id}">
        
            <div>
                <div id="delete-comment">
                    <a href="/comments/destroy/${comment._id}" class="delete-comment-button">X</a>
                </div>
            
                <div id="comment-content">
                    <h5>${comment.user.name}</h5>
                     ${comment.content}
                    
                </div>
        
            </div>
    </li>`)
    }

    deleteComment(deleteLink){
          
         $(deleteLink).click(function(e){
            
            e.preventDefault();

            $.ajax({
                type:"get",
                url:$(deleteLink).prop("href"),
                success:function(data){
                    new Noty({
                        theme:'relax',
                        text: data.message,
                        type:'success',
                        layout:'topRight',
                        timeout: 1500
                        
                        }).show();
                    
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error:function(error) {
                    console.log(error.responseText);
                }
            })
        })
    }
}