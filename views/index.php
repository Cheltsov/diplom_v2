<?php
if(!isset($_COOKIE['SingIN'])){
    header('Location:../index.php');
}
require "../controlers/control_main_page.php";
require "partpage.php";

$part = new partPage();


echo("<title>Ledger - Главная</title>");
$part->head(); // Построение шапки страницы

$part->arr_links("mainPage.css"); //подключить массив фалов стилей

$part->script_links("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js","../js/partpage.js"); //подключить массив фалов javascript
echo('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">');

?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.3.2/flatpickr.min.js"></script>
<link rel="stylesheet" type="text/css" href="../libs/node_modules/flatpickr/dist/themes/material_blue.css">
<script src="../libs/node_modules/flatpickr/dist/flatpickr.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js"></script>
<link rel="stylesheet" href="../libs/node_modules_call/pg-calendar/dist/css/pignose.calendar.css">
<script src="../libs/node_modules_call/pg-calendar/dist/js/pignose.calendar.full.js"></script>
<style>
    .pignose-calendar-top{
        padding:20px 0; !important
    }
    .pignose-calendar .pignose-calendar-top .pignose-calendar-top-date{
        padding: 1em 0; !important
    }
    .calender{
        border:1px solid red;
        height:320px;
        font-size:10pt;
        margin-top:30px;
    }
    #header_tables{
        background-color:#009fe3;
        color:white;
        height:40px;
        font-size:12pt;
    }
    .courses{
        background-color:white;
        border:1px solid red;
        margin-top:0px;
        width:100%
    }
    .menu{
        overflow: auto;
        width:68%;
        float:left;
        margin-rigth:20px;
        margin-left:20px;
        margin-top:30px
    }

    .courses td{
        border:1px solid black;
        padding:0px;
        width:80px;
        height: 50px;
        text-align: center;
    }
    .menu th{
        padding:6px;
    }
    .menu td{
        border:1px solid black;
        padding:6px;
        text-align:center
    }
    .menu tr:nth-child(2n+1) {
        background: lightgrey;
    }
    .menu tr:hover{
        background: grey;
    }
    .menu table{
        width:100%
    }
</style>
<div style="border:2px solid green; width:19%; float:left">
    <div class="calender"></div>

    <div class="all_balance" style="border:1px solid red; height:100px; background-color:white">
        <br>
        <p>Общий счет: <span id="all_sum"></span></p>
    </div>

    <table class="courses">
        <tr id="header_tables">
            <th>Валюта</th>
            <th>Покупка</th>
            <th>Продажа</th>
        </tr>
    </table>

    <div id="content"></div>
</div>

<div id="tabs_tables" class="menu" >
    <ul>
        <li><a href="#fragment-1">Расходы</a></li>
        <li><a href="#fragment-2">Доходы</a></li>
        <li><a href="#fragment-3">Переводы</a></li>
    </ul>
    <div id="fragment-1">
        <table id = "minTable">
        </table>
    </div>
    <div id="fragment-2">
        <table id = "plusTable">
        </table>
    </div>
    <div id="fragment-3">
        <table id = "transTable">
        </table>
    </div>
</div>
<style>
    .operations{
        float:right;
        margin-top:90px;
        margin-right:20px;
    }
    .operations button{
        width:90px;
        height:30px
    }
</style>
<div class="operations">
    <button id="add_tr">Добавить</button>
    <br>
    <br>
    <button id="up_tr">Изменить</button>
    <br><br>
    <button id="del_tr">Удалить</button>
    <br>
</div>

<div id="dialog" >

    <h3 style="text-align:center; width:100%">Добавить</h3>

    <div id="tabs">
        <ul>
            <li><a href="#fragment-1">Расход</a></li>
            <li><a href="#fragment-2">Доход</a></li>
            <li><a href="#fragment-3" id="add_translate">Перевод</a></li>
        </ul>
        <div id="fragment-1">

            <form action="" method="post" id="tr_form_minus">
                <p>Название:</p>
                <input type="text"  required name="name_tr_minus"><br><br>
                <p>Дата:</p>
                <input type="text" id="add_data"><br><br>
                <p>Кошелек:</p>
                <select name="cash_minus" id="cash_minus_sel" required >
                </select>
                <br><br>


                <p>Сумма:</p>
                <input type="number" required step="any" name="balance_minus"> <br><br>
                <p>Комментарий:</p>
                <textarea id="" cols="20" rows="5" name="comment_minus"></textarea><br><br>
                <input type="submit" value="Добавить" name="add_tr_minus" id="sub">
            </form>
        </div>
        <div id="fragment-2">

            <form action="" method="post" id="tr_form_sum">
                <p>Название:</p>
                <input type="text"  required name="name_tr_sum"><br><br>
                <p>Дата:</p>
                <input type="text" id="add_data2"><br><br>
                <p>Кошелек:</p>
                <select name="cash_sum" id="cash_sum_sel" required >
                </select>
                <br><br>

                <p>Сумма:</p>
                <input type="number"  step="any" name="balance_sum"> <br><br>
                <p>Комментарий:</p>
                <textarea id="" cols="20" rows="5" name="comment_sum"></textarea><br><br>
                <input type="submit" value="Добавить" name="add_tr_sum" id="sub">
            </form>

        </div>
        <div id="fragment-3">
            <form action="" method="post" id="trans_from">
                <p>Название:</p>
                <input type="text"  required name="name_trans_cash">
                <p>Дата:</p>
                <input type="text" id="add_data3" >
                <p>Cписать:</p>
                <select name="cash_trans_min" id="cash_trans_min" >
                </select>
                <p>Сумма:</p>
                <input type="number"  step="any" name="trans_balance_min" required >

                <p>Зачислить:</p>
                <select name="cash_trans_sum" id="cash_trans_sum"   >
                </select>
                <p>Курс:</p>
                <input type="number"  step="any" name="course" required  >
                <p>Сумма:</p>
                <input type="number"  step="any" name="trans_balance_sum" required >
                <p>Комментарий:</p>
                <textarea id="" cols="20" rows="5" name="comment_trans"></textarea><br><br>
                <input type="submit" value="Добавить" name="add_tr_sum" id="sub">
            </form>

        </div>
    </div>


</div>

<div id="dialog2" >
    <h3 align="center">Изменить </h3>
    <div id="tabs2">
        <ul>
            <li><a href="#fragment-1">Расход</a></li>
            <li><a href="#fragment-2">Доход</a></li>
            <li><a href="#fragment-3">Перевод</a></li>
        </ul>
        <div id="fragment-1">
            <form action="" method="post" id="up_tr_form_minus">
                <p>Название:</p>
                <input type="text"  required name="up_name_tr_minus"><br><br>
                <p>Дата:</p>
                <input type="text" id="add_data4"><br><br>
                <p>Кошелек:</p>
                <select name="cash_minus" id="up_cash_minus_sel" required >
                </select>
                <br><br>


                <p>Сумма:</p>
                <input type="number" required step="any" name="up_balance_minus"> <br><br>
                <p>Комментарий:</p>
                <textarea id="up_comment" cols="20" rows="5" name="up_comment_minus"></textarea><br><br>
                <input type="submit" value="Изменить" name="add_tr_minus" id="up_sub">
            </form>
        </div>
        <div id="fragment-2">
            <form action="" method="post" id="up_tr_form_sum">
                <p>Название:</p>
                <input type="text"  required name="up_name_tr_sum"><br><br>
                <p>Дата:</p>
                <input type="text" id="add_data5"><br><br>
                <p>Кошелек:</p>
                <select name="cash_sum" id="up_cash_sum_sel" required >
                </select>
                <br><br>

                <p>Сумма:</p>
                <input type="number"  step="any" name="up_balance_sum"> <br><br>
                <p>Комментарий:</p>
                <textarea id="up_comment_sum" cols="20" rows="5" name="up_comment_sum"></textarea><br><br>
                <input type="submit" value="Изменить" name="add_tr_sum" id="up_sub">
            </form>

        </div>
        <div id="fragment-3">
            <form action="" method="post" id="up_trans_from">
                <p>Название:</p>
                <input type="text"  required name="up_name_trans_cash">
                <p>Дата:</p>
                <input type="text" id="add_data6" >
                <p>Cписать:</p>
                <select name="up_cash_trans_min" id="up_cash_trans_min" >
                </select>
                <p>Сумма:</p>
                <input type="number"  step="any" name="up_trans_balance_min" required >

                <p>Зачислить:</p>
                <select name="up_cash_trans_sum" id="up_cash_trans_sum"   >
                </select>
                <p>Курс:</p>
                <input type="number"  step="any" name="up_course" required  >
                <p>Сумма:</p>
                <input type="number"  step="any" name="up_trans_balance_sum" required >
                <p>Комментарий:</p>
                <textarea id="up_comment_trans" cols="20" rows="5" name="comment_trans"></textarea><br><br>
                <input type="submit" value="Изменить" name="add_tr_sum" id="sub">
            </form>

        </div>

    </div>


</div>

<div id="dialog3" style="text-align:center">
    <p >Вы действительно хотите удалить транзакцию?</p>
    <br>
    <button id="yes">Да</button>
    <button id="no">Нет</button>

</div>


<script>



    $(document).ready(function(){
        $.post("../controlers/control_main_page.php",
            {wanna_all_balance: "1"},
            function(data){
                $("#all_sum").empty();
                $("#all_sum").append(data+" (UAH)");
            }
        );
    });

    $('.calender').pignoseCalendar({
        lang: 'en',
        date: moment(),
        week:1,
        theme: 'blue',
        format: 'YYYY-MM-DD',
        select: function(date, context) {
            //alert(date[0]['_i']); // получить дату
            GetAllTr(date[0]['_i']);
        }
    });







</script>
<?php
    $part->script_links("../js/index_page.js", "../js/tranz.js");
    $part->foot();// Построение подвала страницы
?>
