//redirect if not valid login
let currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}

// setting welcome text
$('#welcomeText').html(`Hello ${currentUser.uname}! <br> Welcome 'To Do' List`);

// code for log out
$('#logOut').on('click',(e)=>{
    e.preventDefault();
    // Sign-out successful.
    window.localStorage.removeItem('user');
    window.location="index.html";
    console.log('Logout Successfully');
})

// AJAX call to fetch data using axios library.
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox" class="checkbox" ${el.completed?' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('Failed To Fetch Lists Data',e);
    }
}
// call getlist() when GET LIST is clicked.
$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});

//variable to keep track of cheking list items
let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('Count Not Equal To 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`You Have Done ${data} Activities Today.... Congrats!`);
    })
    .catch((err)=>{
        console.log('Promise Rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }
    
    promiseCall();


});




