$(document).ready(function(){
    setTimeout(function(){

        $('.search').keyup(function(e) {

            var name = $('.search').val()
            console.log(name);
            if(name === ' ' || e.keyCode === 8){
                $('.username').html("<ul class = 'content'></ul><p class = 'display'></p>")
            }
            else if (name !== '') {
                $.get('/submit', { text: name }, function(data) {
                    console.log(data.output);
                    var users = data.output;
                    var content = ""
                    for (var user in users) {
                        content = content + `<li><a>${users[user].firstname}</a></li><br>`
                    }

                    $('.content').html(content)
                    $('li').click(function() {

                        var selected = $(this).text();
                        $('.search').val(selected);
                        $('.content').html("");
                        $('.submit').click(function() {
                            var something = users.find(function(index) {
                                return index.firstname === selected;
                            })
                            console.log(something);
                            $('.display').html(`<b>User Found<b><br>FirstName: ${something.firstname}<br> LastName:${something.lastname}<br> Email:${something.email}<br/>`)
                            setTimeout(function(){
                                $('.display').html("");
                            },4000)
                        })

                    })


                })
            }
        })

    },300)
})

