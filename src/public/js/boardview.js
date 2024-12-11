const postId = window.location.pathname.split('/').pop();
let userEmail = null; 

if (postId) {
    fetch(`/api/board/post/${postId}`)
        .then(res => res.json())
        .then(data => {
            userEmail = data.email;
            document.getElementById('boardTitle').innerText = data.title;
            document.getElementById('boardContent').innerText = data.content;
            document.getElementById('boardUser').innerText = userEmail;
        }).catch(error => {
            console.error('Error fetching post details:', error);
        });
} else {
    console.error('No post ID found in query string');
}

async function checkUser() {
    const token = sessionStorage.getItem("authToken");

    if (!token){
        window.location.href = '/login'
        alert("로그인 후에 사용할 수 있는 기능입니다.");
    }

    const tokenEmail = await (await fetch(`/api/user/tokenToEmail`, {
            method: 'POST',
            headers: { 'authorization': token },
        })).json();
    
    if (tokenEmail !== userEmail) {
        alert('게시글 삭제에 대한 권한이 없습니다.');
        return false;
    }

    return true;
}
//삭제버튼 기능
document.getElementById('deleteBtn').addEventListener('click', async function() {
    try{
        const isSameUser = await checkUser();
        if(isSameUser){
            const result = confirm("정말 삭제하시겠습니까?");
            if(result){
                const res = await fetch(`/api/board/${postId}`, {
                    method: 'DELETE'
                });

                if(res.status===200){
                    alert('삭제되었습니다.');
                    window.location.href = '/list';
                }
            }      
        }
    }catch(err){
        throw new Error(err);
    }
});

//수정버튼 기능
document.getElementById('modifyBtn').addEventListener('click', function(){
        window.location.href =`/modify/${postId}`
})