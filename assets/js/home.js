

{ 
    $(document).ready(function() {
    // Get the element by ID and set its inner HTML
    let currentDate = new Date(); // Create a new Date object representing the current date and time

    // Format the date as "DD/MM/YYYY"
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    let year = currentDate.getFullYear();

    // Add leading zeros if necessary
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    let formattedDate = day + '/' + month + '/' + year;

    // Set the content of an element with the ID "demo" to the formatted date
    $("#date").html(formattedDate);
});

    
    let createHabit= function(){
        let createForm=$('#new-habit-form');

        createForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: "/new-habit",
                data: createForm.serialize(),
                success: function(data) {
                    let newHabit=newHabitDOM(data.data.habit);
                    $('#habit-container').append(newHabit);
                    
                    changeCompletedStatus($(' .completed-status-link'));

                    deleteHabit($('.deleteTag'));
                },error:function(err){
                    console.log(err);
                }
              });
        });
    }

    newHabitDOM=(habit)=>{
        let color='orange';
        // if(habit.completed=='none'){
        //     color="orange"
        // }else if(habit.completed=='yes'){
        //     color="green"
        // }else{
        //     color="red"
        // }

        let tzoffset = (new Date()).getTimezoneOffset() * 60000, found=false, status='';
        var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
        
        return $(`<div class="habit" id="${habit._id}">
        <div style="width: 40%">${habit.content}</div>
        <div>
            <a class="completed-status-link" href="/complete-status-update/?id=${habit._id}&date=${today}">
                <div class="completed-status" style="background-color: ${color}"};"></div>
            </a>
        </div>
        <div>
            <a class="deleteTag" href="/delete/?id=${habit._id}"><i class="fa-regular fa-trash-can"></i></a>
        </div>
    </div>`)
    }


    deleteHabit=(link)=>{
        console.log(link);
       $(link).click(function(e){
        e.preventDefault();

        $.ajax({    
            type:'get',
            url:$(link).prop('href'),
            success:function(data){
                $(`#${data.data.habit_id}`).remove();
            },error:function(err){
                console.log(err);
            }
        });
       });
    }

    changeCompletedStatus=(link)=>{
        $(link).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(link).prop('href'),
                success: function(data){
                    $(`#${data.data.habit._id}`).remove();
                    let newHabit=newHabitDOM(data.data.habit);
                    $('#habit-container').append(newHabit);
                }, error:function(err){
                    console.log(err);
                }
            })
        })
    }


 
    createHabit();

}

