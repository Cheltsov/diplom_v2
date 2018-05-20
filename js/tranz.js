$(document).ready(function(){
    $("#all_bal").click();
    // меню
    $("#menu .but_forCash").click(function() {
        $(this).next().toggle("fast");
        return false;
    }).next()
});


$(document).ready(function(){
    $.post(
        "../controlers/control_tranzactions.php",
        {wanna_info_cash : "1"},
        function(data){
            data = JSON.parse(data);
            for(i=4,n=2,id=0,b=5,t=3;i<data.length;i+=10,n+=10,id+=10,b+=10,t+=10){
                if(data[i]==1){
                    $("#hands").append("<li><button class='type' id='cash_"+data[id]+"'>"+data[n]+":"+parseFloat(data[b]).toFixed(2)+" ("+data[t]+") </button></li>");
                }
                if(data[i]==2){
                    $("#cards").append("<li><button class='type' id='cash_"+data[id]+"'>"+data[n]+":"+parseFloat(data[b]).toFixed(2)+" ("+data[t]+") </button></li>");
                }
            }

        }
    );

    $("#add_data4").flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });
    $("#add_data5").flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });
    $("#add_data6").flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });



    $("#hands, #cards").on("click", ".type",function(){
        $("#minTable").empty();
        tmp_id = "";
        index ="";
        var idbut = $(this).attr("id");
        id_cash = idbut.slice(5);
        $.post("../controlers/control_tranzactions.php",
            {
                wanna_tr_min_fromID : "1",
                cash_index : id_cash
            },
            function(data){
                //alert(data);
                $("#minTable").append("<tr><th>Название</th><th>Кошелек</th><th>Сумма</th><th>Комментарий</th><th>Дата</th></tr>");
                data = JSON.parse(data);
                for(i=1,j=2,a=3,b=4,c=5,d=6,il=0;il<data.length;i+=7,j+=7,a+=7,b+=7,c+=7,d+=7,il+=7){
                    $("#minTable").append("<tr id='"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[j]+"</td>"+ "<td>"+parseFloat(data[a]).toFixed(2)+"</td>"+  "<td>"+data[b]+"</td>"  +  "<td>"+data[d]+"</td>"+ "</tr>");
                }

            });
        $("#plusTable").empty();
        $.post("../controlers/control_tranzactions.php",
            {
                wanna_tr_plus_fromID : "1",
                cash_index : id_cash
            },
            function(data){
                $("#plusTable").append("<tr><th>Название</th><th>Кошелек</th><th>Сумма</th><th>Комментарий</th><th>Дата</th></tr>");
                data = JSON.parse(data);
                for(i=1,j=2,a=3,b=4,c=5,d=6,il=0;il<data.length;i+=7,j+=7,a+=7,b+=7,c+=7,d+=7,il+=7){
                    $("#plusTable").append("<tr id='"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[j]+"</td>"+ "<td>"+parseFloat(data[a]).toFixed(2)+"</td>"+  "<td>"+data[b]+"</td>" + "<td>"+data[d]+"</td>"+ "</tr>");
                }
            });
        $("#transTable").empty();
        $.post("../controlers/control_tranzactions.php",
            {
                wanna_tr_trans_fromID : "1",
                cash_index : id_cash,
            },
            function(data){
                $("#transTable").append("<tr><th>Название</th><th>Кошелек1</th><th>Снято</th><th>Кошелек2</th><th>Зачислено</th><th>Комментарий</th><th>Дата</th></tr>");
                data = JSON.parse(data);
                for(i=1,j=2,a=3,b=4,c=5,d=6,e=7,f=8,il=0;il<data.length;i+=9,j+=9,a+=9,b+=9,c+=9,d+=9,il+=9,e+=9,f+=9){
                    $("#transTable").append("<tr id='ts"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[a]+"</td>"+ "<td>"+parseFloat(data[b]).toFixed(2)+"</td>"+  "<td>"+data[c]+"</td>" + "<td>"+parseFloat(data[d]).toFixed(2)+"</td>" +  "<td>"+data[e]+"</td>"+"<td>"+data[j]+"</td>"+"</tr>");
                }
            }
        );
    });
});

$("#add_tr").click(function(){

    $("#dialog2").dialog('close');
    $("#dialog3").dialog('close');
    $.post("../controlers/control_tranzactions.php",
        {want_id_cash: "1"},

        function(data){
            data = JSON.parse(data);
            for(i=2,j=5,k=0,vl=3;i<data.length;i+=10,j+=10,k+=10,vl+=10){ // получить имя кошльков
                $("#cash_minus_sel").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#cash_sum_sel").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#cash_trans_sum").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#cash_trans_min").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
            }
        });

    $("option").remove();
    $("#dialog").dialog('open');
    // Получение текущего месяца и года
    year = new Date().getFullYear();
    month = new Date().getMonth()+1;
    date_now = year+"-"+month;
    //Ограничить ввод прошеднего месяца
    $("#add_data").flatpickr({
        minDate: date_now,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });

    $("#add_data2").flatpickr({
        minDate: date_now,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });
    $("#add_data3").flatpickr({
        minDate: date_now,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });

});

$(function(){
    // меню
    $("#menu h3").click(function() {
        $(this).next().toggle();
        return false;
    }).next().show("slow");
    // открываем все
    $("a.open").click(function(){
        $("#menu ul").show("slow");
    });
    // закрываем все
    $("a.close").click(function(){
        $("#menu ul").hide("slow");
    });
});







$('#dialog').dialog({
    autoOpen: false,
    show: {
        effect: 'drop',
        duration: 500
    },
    hide: {
        effect: 'clip',
        duration: 500
    },
    width: 500
});

$('#dialog2').dialog({
    autoOpen: false,
    show: {
        effect: 'drop',
        duration: 500
    },
    hide: {
        effect: 'clip',
        duration: 500
    },
    width: 500,
    close: function( event, ui ) {
        $("input[name='up_name_tr_minus']").val("");
        $("#add_data4").val("");
        $("#up_cash_minus_sel").val("").selectmenu('refresh');
        $("input[name='up_balance_minus']").val("");
        $("#up_comment").val("");
        $("input[name='up_name_tr_sum']").val("");
        $("#add_data5").val("");
        $("#up_cash_sum_sel").val("").selectmenu('refresh');
        $("input[name='up_balance_sum']").val("");
        $("#up_comment_sum").val("");

        $("input[name='name_trans_cash']").val("");
        $("#add_data6").val("");
        $("#up_cash_trans_min").val("").selectmenu('refresh');
        $("input[name='trans_balance_min']").val("");
        $("#up_cash_trans_sum").val("").selectmenu('refresh');
        $("input[name='course']").val("");
        $("input[name='trans_balance_sum']").val("");
        $("input[name='comment_trans']").val("");
        tmp_id = "";
        index ="";
    }
});

$(document).ready(function(){
    $( "#tabs" ).tabs({
        active: 0,
        event: "click",
        heightStyle: 'content'
    });

    $( "#tabs2" ).tabs({
        active: 0,
        event: "click",
        heightStyle: 'content'
    });
});

$( "#cash_minus_sel" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#cash_minus_sel" ).selectmenu({
    width: 315
});

$( "#cash_sum_sel" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#cash_sum_sel" ).selectmenu({
    width: 315
});

$( "#cash_trans_min" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#cash_trans_min" ).selectmenu({
    width: 315
});

$( "#cash_trans_sum" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#cash_trans_sum" ).selectmenu({
    width: 315
});
$( "#up_cash_minus_sel" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#up_cash_minus_sel" ).selectmenu({
    width: 315
});

$( "#up_cash_sum_sel" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#up_cash_sum_sel" ).selectmenu({
    width: 315
});

$( "#up_cash_trans_min" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#up_cash_trans_min" ).selectmenu({
    width: 315
});

$( "#up_cash_trans_sum" )
    .selectmenu()
    .selectmenu( "menuWidget" )
    .addClass( "overflow" );

$( "#up_cash_trans_sum" ).selectmenu({
    width: 315
});





$(document).ready(function() {
    tmp_id="";
    index="";

    $(" #plusTable").on('click', ".col", function(){

        if ($(this).css("background-color") == 'rgb(0, 159, 227)') {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
                tmp_id = "";
                index = "";
            }
            return false;
        }
        else {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
            }
            tmp_id = "";
            index = "";
            string = this.id;
            str = string.split('');
            index = string;
            flag_ts = "000";
            what_tr = "plus";
            document.getElementById(string).style.backgroundColor = "#009fe3";
        }
    });

    $("#minTable").on('click', ".col", function(){

        if ($(this).css("background-color") == 'rgb(0, 159, 227)') {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
                tmp_id = "";
                index = "";
            }
            return false;
        }
        else {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
            }
            tmp_id = "";
            index = "";
            string = this.id;
            str = string.split('');
            index = string;
            flag_ts = "000";
            what_tr = "min";
            document.getElementById(string).style.backgroundColor = "#009fe3";
        }

    });

    $("#transTable").on('click', ".col", function(){

        if ($(this).css("background-color") == 'rgb(0, 159, 227)') {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
                tmp_id = "";
                index = "";
            }
            return false;
        }
        else {
            var li = $(".col"), i = li.length;
            while (i--) {
                li[i].style.backgroundColor = i % 2 ? 'lightgrey' : 'white';
            }
            tmp_id = "";
            index = "";
            string =  this.id;
            str = string.split('');
            for(i=2;i<str.length;i++){
                tmp_id += str[i];
            }
            flag_ts = "111";
            //what_tr = "plus";
            document.getElementById(string).style.backgroundColor = "#009fe3";
        }

    });

    //Del_tr.click
    $("#del_tr").click(function(){
        if(index=="" && tmp_id ==""){
            alert("Выберите транзакцию!");
            return;
        }
        $("#dialog").dialog('close');
        $("#dialog2").dialog('close');
        //$("#dialog_del2").dialog('close');

        if($(".col").css("backgroundColor") != "rgba(0, 0, 0, 0)")  {

            $("#dialog").dialog('close');

            $("#dialog3").dialog('open');

            $("#yes").click(function(){
                $("#dialog3").dialog('close');

                if(flag_ts == "111"){
                    $.post("../controlers/control_tranzactions.php", {
                            del_trans : "1",
                            index_trans : tmp_id
                        },
                        function(data){
                            if(data === "false"){
                                alert("Нельзя удалить");
                            }
                            else{
                                alert(data);
                                location.reload(true);

                            }
                        }
                    );
                    flag_ts = "";
                }
                if(flag_ts == "000"){
                    alert(index);
                    $.post("../controlers/control_tranzactions.php", {del_tr: "1", id_tr: index},
                        function(data){
                            if(data == "false"){
                                alert("Нельзя удалить");
                            }
                            else{
                                alert(data);
                                location.reload(true);
                            }
                        }
                    );
                    flag_ts="";
                }
            });

            $("#no").click(function(){
                $("#dialog3").dialog('close');
            });
        }
        else alert("Выберите транзакцию");
    });



} );




$("#all_bal").click(function(){ // заполнение таблицы при нажатии кнопки ВСЕ!
    $("#minTable").empty();
    $.post("../controlers/control_tranzactions.php",
        {
            wanna_tr_min : "1"
        },
        function(data){
        //alert(data);
            $("#minTable").append("<tr><th>Название</th><th>Кошелек</th><th>Сумма</th><th>Комментарий</th><th>Дата</th></tr>");
       data = JSON.parse(data);
            for(i=1,j=2,a=3,b=4,c=5,d=6,il=0;il<data.length;i+=7,j+=7,a+=7,b+=7,c+=7,d+=7,il+=7){
                $("#minTable").append("<tr id='"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[j]+"</td>"+ "<td>"+parseFloat(data[a]).toFixed(2)+"</td>"+  "<td>"+data[b]+"</td>" + "<td>"+data[d]+"</td>"+ "</tr>");
            }
        });
    $("#plusTable").empty();
    $.post("../controlers/control_tranzactions.php",
        {
            wanna_tr_plus : "1"
        },
        function(data){
            $("#plusTable").append("<tr><th>Название</th><th>Кошелек</th><th>Сумма</th><th>Комментарий</th><th>Дата</th></tr>");
            data = JSON.parse(data);
            for(i=1,j=2,a=3,b=4,c=5,d=6,il=0;il<data.length;i+=7,j+=7,a+=7,b+=7,c+=7,d+=7,il+=7){
                $("#plusTable").append("<tr id='"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[j]+"</td>"+ "<td>"+parseFloat(data[a]).toFixed(2)+"</td>"+  "<td>"+data[b]+"</td>" + "<td>"+data[d]+"</td>"+ "</tr>");

            }
        });
    $("#transTable").empty();
    $.post("../controlers/control_tranzactions.php",
        {
            wanna_tr_trans : "1"
        },
        function(data){
            //alert(data);
            $("#transTable").append("<tr><th>Название</th><th>Кошелек1</th><th>Снято</th><th>Кошелек2</th><th>Зачислено</th><th>Комментарий</th><th>Дата</th></tr>");
            data = JSON.parse(data);
            for(i=1,j=2,a=3,b=4,c=5,d=6,e=7,f=8,il=0;il<data.length;i+=9,j+=9,a+=9,b+=9,c+=9,d+=9,il+=9,e+=9,f+=9){
                $("#transTable").append("<tr id='ts"+data[il]+"' class='col'>" +"<td id='name'>"+data[i]+"&nbsp</td>" + "<td id='cash'>"+data[a]+"</td>"+ "<td>"+parseFloat(data[b]).toFixed(2)+"</td>"+  "<td>"+data[c]+"</td>" + "<td>"+parseFloat(data[d]).toFixed(2)+"</td>" +  "<td>"+data[e]+"</td>"+ "<td>"+data[j]+"</td>"+"</tr>");
            }
        }
    );
});

$("#tr_form_minus").submit(function(){

    $.post("../controlers/control_tranzactions.php",
        {
            name_trMin: ucFirst($("input[name='name_tr_minus']").val()),
            cash_trMin: $("select[name='cash_minus']").val(),
            balance_trMin: parseFloat($("input[name='balance_minus']").val()).toFixed(2),
            comment_trMin: ucFirst($("textarea[name='comment_minus']").val()),
            data_trMin : $("#add_data").val()
        },
        function(data){
            if(data == "1") alert("Транзакция успешно добавлена!");
            else alert("Транзакция не добавлена!");
        });
});

$('#tr_form_sum').submit(function(){

    $.post("../controlers/control_tranzactions.php",
        {
            name_trSum: ucFirst($("input[name='name_tr_sum']").val()),
            cash_trSum: $("select[name='cash_sum']").val(),
            balance_trSum: parseFloat($("input[name='balance_sum']").val()).toFixed(2),
            comment_trSum: ucFirst($("textarea[name='comment_sum']").val()),
            data_trSum : $("#add_data2").val()
        },
        function(data){
            if(data) alert("Транзакция успешно добавлена!");
            else alert("Транзакция не добавлена!");
        });
});




$('#dialog3').dialog({
    autoOpen: false,
    show: {effect: 'drop', duration: 500},
    hide: {effect: 'clip', duration: 500},
    width: 350
});




$("#trans_from").submit(function(){

    $.post(
        "../controlers/control_tranzactions.php",
        {
            name_trans : ucFirst($("input[name='name_trans_cash']").val()),
            date_trans : $("#add_data3").val(),
            cash_min_trans : $("#cash_trans_min").val(),
            balanc_min_trans : parseFloat($("input[name='trans_balance_min']").val()).toFixed(2),
            course_trans : parseFloat($("input[name='course']").val()).toFixed(2),
            cash_sum_trans : $("#cash_trans_sum").val(),
            balanc_sum_trans : parseFloat($("input[name='trans_balance_sum']").val()).toFixed(2),
            comment_trans : ucFirst($("textarea[name='comment_trans']").val())
        },
        function(data){
            alert(data);
        }
    );
});

$("#cash_trans_sum").on("selectmenuchange", function(event,ui){
    BalanceNew();

});
$("#cash_trans_min").on("selectmenuchange", function(event,ui){
    BalanceNew();
});

$("input[name='trans_balance_min']").keyup(function(){
    BalanceNew();
});

$("input[name='course']").keyup(function(){
    BalanceNew();
});



function BalanceNew(){

    last_cash = $("#cash_trans_min").val();
    new_cash = $("#cash_trans_sum").val();
    course = $("input[name='course']").val();

    $.post("../controlers/control_tranzactions.php",
        {
            getNewbalance : "1",
            last_cash : last_cash,
            new_cash : new_cash,
            course : course,
            balance : parseFloat($("input[name='trans_balance_min']").val()).toFixed(2)
        },
        function(data){
            //alert(data);
            data = JSON.parse(data);
            $("input[name='course']").val(data[0].toFixed(2));
            $("input[name='trans_balance_sum']").val(data[1].toFixed(2));
        }

    );
}

$("#up_tr").click(function(){
    if(index=="" && tmp_id ==""){
        alert("Выберите транзакцию!");
        return;
    }
    $("#dialog3").dialog('close');
    $("#dialog1").dialog('close');
    $.post("../controlers/control_tranzactions.php",
        {want_id_cash: "1"},

        function(data){
            data = JSON.parse(data);
            for(i=2,j=5,k=0,vl=3;i<data.length;i+=10,j+=10,k+=10,vl+=10){ // получить имя кошльков
                $("#up_cash_minus_sel").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#up_cash_sum_sel").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#up_cash_trans_sum").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
                $("#up_cash_trans_min").append("<option value='"+data[k]+"'>"+data[i]+" ("+parseFloat(data[j]).toFixed(2)+" "+data[vl]+")</option>").selectmenu('refresh');
            }
        });

    $("option").remove();
    if($(".col").css("backgroundColor") != "rgba(0, 0, 0, 0)"){
        if(index !=""){
            $("#tabs2").tabs("disable",2);
            $("#tabs2").tabs("enable",0);
            $("#tabs2").tabs("enable",1);
            if(what_tr == "min") $( "#tabs2" ).tabs( "option", "active", 0);
            if(what_tr == "plus") $( "#tabs2" ).tabs( "option", "active", 1 );
        }

        if(tmp_id !=""){
            $("#tabs2").tabs("disable",0);
            $("#tabs2").tabs("disable",1);
            $("#tabs2").tabs("enable",2);
            $( "#tabs2" ).tabs( "option", "active", 2 );
        }
        $.post(
            "../controlers/control_tranzactions.php",
            {
                wanna_info_tranz : "1",
                id_tr : index,
                id_trans : tmp_id
            },
            function(data){
                data = JSON.parse(data);
                if(data != false){
                    $("#dialog2").dialog('open');
                    if(index !=""){
                        if(what_tr == "min"){
                            $("input[name='up_name_tr_minus']").val(data[1]);
                            $("#add_data4").val(data[6]);
                            $("#up_cash_minus_sel").val(data[2]).selectmenu('refresh');
                            $("input[name='up_balance_minus']").val(data[3]);
                            $("#up_comment").val(data[4]);
                            $("input[name='up_name_tr_sum']").val(data[1]);
                            $("#add_data5").val(data[6]);
                            $("#up_cash_sum_sel").val(data[2]).selectmenu('refresh');
                            $("input[name='up_balance_sum']").val(data[3]);
                            $("#up_comment_sum").val(data[4]);
                        }
                        if(what_tr == "plus"){
                            $("input[name='up_name_tr_sum']").val(data[1]);
                            $("#add_data5").val(data[6]);
                            $("#up_cash_sum_sel").val(data[2]).selectmenu('refresh');
                            $("input[name='up_balance_sum']").val(data[3]);
                            $("#up_comment_sum").val(data[4]);
                            $("input[name='up_name_tr_minus']").val(data[1]);
                            $("#add_data4").val(data[6]);
                            $("#up_cash_minus_sel").val(data[2]).selectmenu('refresh');
                            $("input[name='up_balance_minus']").val(data[3]);
                            $("#up_comment").val(data[4]);
                        }

                    }

                    if(tmp_id !=""){
                        $("input[name='up_name_trans_cash']").val(data[1]);
                        $("#add_data6").val(data[2]);
                        $("#up_cash_trans_min").val(data[3]).selectmenu('refresh');
                        $("input[name='up_trans_balance_min']").val(data[4]);
                        $("#up_cash_trans_sum").val(data[5]).selectmenu('refresh');
                        $("input[name='up_course']").val(data[9]);
                        $("input[name='up_trans_balance_sum']").val(data[6]);
                        $("input[name='up_comment_trans']").val(data[7]);
                    }
                    up_ind = index;
                    //tmp_id ="";
                }
                else{
                    //$("#dialog2").dialog('close');
                    alert("Нельзя изменить транзакцию");
                    return ;
                }
            }

        );
    }
    else alert("Выберите транзакцию!");

});


$("#up_tr_form_minus").submit(function(){

    $.post("../controlers/control_tranzactions.php",
        {
            up_name : ucFirst($("input[name='up_name_tr_minus']").val()),
            up_data : $("#add_data4").val(),
            up_cash_min : $("#up_cash_minus_sel").val(),
            up_balance_min : parseFloat($("input[name='up_balance_minus']").val()).toFixed(2),
            up_comment :  ucFirst($("#up_comment").val()),
            up_index : index
        },
        function(data){
             alert("Транзакция обновлена!");
        }
    );
});

$("#up_tr_form_sum").submit(function(){

    $.post("../controlers/control_tranzactions.php",
        {
            up_name_sum : ucFirst($("input[name='up_name_tr_sum']").val()),
            up_data_sum : $("#add_data5").val(),
            up_cash_sum : $("#up_cash_sum_sel").val(),
            up_balance_sum :  parseFloat($("input[name='up_balance_sum']").val()).toFixed(2),
            up_comment_sum :  ucFirst($("#up_comment_sum").val()),
            up_index_sum : index
        },
        function(data){
            alert("Транзакция обновлена!");
        }
    );
});

$("#up_trans_from").submit(function(){

    $.post("../controlers/control_tranzactions.php",
        {
            up_trans_name : ucFirst($("input[name='up_name_trans_cash']").val()),
            up_trans_data : $("#add_data6").val(),
            up_trans_cash_min : $("#up_cash_trans_min").val(),
            up_trans_balance_min :  parseFloat($("input[name='up_trans_balance_min']").val()).toFixed(2),
            up_trans_cash_sum : $("#up_cash_trans_sum").val(),
            up_course : $("input[name='up_course']").val(),
            up_trans_balance_sum : parseFloat($("input[name='up_trans_balance_sum']").val()).toFixed(2),
            up_trans_comment :  ucFirst($("#up_comment_trans").val()),
            up_trans_index : tmp_id
        },
        function(data){
            alert("Транзакция обновлена!");
        }
    );
});

$("#test_tr").click(function(){
    //Запрос на добавление дополнительной транзакции
    $.post(
        "../controlers/control_tranzactions.php",
        {test_event: "1"},
        function(data){
            alert(data);
            location.reload();
        }
    );
});

$(document).ready(function(){
    $.post(
        "../controlers/control_tranzactions.php",
        {wanna_cash_month: "1"},
        function(data){
            $("#but_forCash_month").trigger("click");
            $("#but_forCash_month_card").trigger("click");
            data = JSON.parse(data);
            for(i=0,n=1,tm=2,tc=3,b=4;i<data.length;i+=5,n+=5,tm+=5,tc+=5,b+=5){
                if(data[tc]==1){

                    $("#hands_month").append("<li><button class='type' id='cashm_"+data[i]+"'>"+data[n]+":"+data[b]+" ("+data[tm]+") </button></li>");
                }
                if(data[tc]==2){
                    $("#cards_month").append("<li><button class='type' id='cashm_"+data[i]+"'>"+data[n]+":"+data[b]+" ("+data[tm]+") </button></li>");
                }
            }
        }
    );
});

$('#dialog_conv').dialog({
    autoOpen: false,
    show: {
        effect: 'drop',
        duration: 500
    },
    hide: {
        effect: 'clip',
        duration: 500
    },
    width: 500
});

$("#conversion").click(function(){
    $.post("../controlers/control_tranzactions.php",
        {conv : "1"},
        function(data){
            var obj = JSON.parse(data);
            for(i=0,j=2,v=3,b=5;i<obj.length;i+=10,j+=10,v+=10,b+=10){
                $("#name_cash").append("<label>"+obj[j]+"("+obj[v]+")</label>&nbsp<input type='number' id='cov"+obj[i]+"' class='in_conv' step='any' name='cov_bal' value='"+obj[b]+"'><br><br>");
            }
            $("#name_cash").append("<button id = 'add_conv'>Добавить</button>");
        }
    );
    $("#dialog_conv").dialog('open');
});

var ary = [];
cashs_json = "";

$("#name_cash").on("click keyup",".in_conv",function(){

    id_cash = $(this).attr("id").substring(3);
    bal = $(this).val();
    var obj = {};
    obj[id_cash] = bal;
    ary.push(obj);
    for (var key in ary) {
        for (var key2 in ary[key]){
            console.log("k= "+key2+" rr="+ary[key][key2]);
            if(key2 == id_cash){
                ary[key][key2] = bal;
            }
        }
    }
    cashs_json = JSON.stringify(ary);
});

$("#name_cash").on("click","#add_conv",function(){
    $("#name_cash").empty();
    alert(cashs_json);
    $.post(
        "../controlers/control_tranzactions.php",
        { na_cashs_josn : cashs_json},
        function(data){
            alert(data);
            //location.reload();
        }
    );
});


function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}