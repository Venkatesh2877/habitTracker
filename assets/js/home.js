{
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

                    deleteHabit($(' .deleteTag', newHabit));
                },error:function(err){
                    console.log(err);
                }
              });
        });
    }

    newHabitDOM=(habit)=>{
        return $(`<div class="habit" id="${habit._id}">
        <div>${habit.name}</div>
        <div>
            <a class="deleteTag" href="/delete/?id=${habit._id}"><i class="fa-regular fa-trash-can fa-bounce"></i></a>
        </div>
    </div>`)
    }

    deleteHabit=(link)=>{
       $(link).click(function(e){
        e.preventDefault();

        $.ajax({    
            type:'get',
            url:$(link).prop('href'),
            success:function(data){
                $(`#habit-container> #${data.data.habit_id}`).remove();
            },error:function(err){
                console.log(err);
            }
        })
    
       })
    }

    createHabit();

}
