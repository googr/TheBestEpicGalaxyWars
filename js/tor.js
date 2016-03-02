/**
 * Created by GoogR on 28.02.2016.
 */

function ShowTOR (){
    for(i=0; i< highscore.length; i++){
        var P=highscore[i];
        document.getElementById('Table').innerHTML +=('<tr><td>'+(i+1)+'</td><td>'+P.n+'</td><td>'+ P.s+'</td></tr>');
    };
}
function RefreshTOR()
{
    $.ajax(
        {
            url : "http://fe.it-academy.by/AjaxStringStorage2.php",
            type : 'POST',
            data : { f : 'READ', n : 'ROHOZIK_STARBATTLE_TOR' },
            cache : false,
            success : ReadReady,
            error : ErrorHandler
        }
    );
}
function ReadReady(ResultH) // сообщения получены - показывает
{
    if ( ResultH.error!=undefined )
        alert(ResultH.error);
    else
    {
        highscore=[];
        if ( ResultH.result!="" ) // либо строка пустая - сообщений нет
        {
            // либо в строке - JSON-представление массива сообщений
            highscore=JSON.parse(ResultH.result);
        }
        ShowTOR();
    }
}


function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
    alert(StatusStr+' '+ErrorStr);
}
RefreshTOR();