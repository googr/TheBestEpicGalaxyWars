window.onhashchange=SwitchToStateFromURLHash;
function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
	alert(StatusStr+' '+ErrorStr);
};
function UpdateToState(NewPage)
{
	var PageHTML="";
	switch ( NewPage )
	{
		case 'Main':
			 $.ajax("main.html",{ type:'GET', dataType:'html', success:DataLoaded, error:ErrorHandler });
			   function DataLoaded(data)
			   {
				   PageHTML=data;
				   document.getElementById('Page').innerHTML=PageHTML;
			   }
			document.getElementById('Page').innerHTML=PageHTML;
			break;
		case 'Game':
			 $.ajax("game.html",{ type:'GET', dataType:'html', success:DataLoaded, error:ErrorHandler });
			   function DataLoaded(data)
			   {
				   PageHTML=data;
				   document.getElementById('Page').innerHTML=PageHTML;
			   }
			$.ajax({
				type: "GET",
				url: "js/game.js",
				dataType: "script",
				cache: false
			});
			break;

			document.getElementById('Page').innerHTML=PageHTML;
			break;
		case 'TOR':
			 $.ajax("tor.html",{ type:'GET', dataType:'html', success:DataLoaded, error:ErrorHandler });
			   function DataLoaded(data)
			   {
				   PageHTML=data;
				   document.getElementById('Page').innerHTML=PageHTML;
			   }
			document.getElementById('Page').innerHTML=PageHTML;
			$.ajax({
				type: "GET",
				url: "js/tor.js",
				dataType: "script",
				cache: false
			});
			break;
	}
}
function SwitchToStateFromURLHash()
{
	var URLHash=window.location.hash;
	var StateJSON=decodeURIComponent(URLHash.substr(1));
	if ( StateJSON!="" ){
		UpdateToState( JSON.parse(StateJSON) );
	}else{
		UpdateToState("Main"); 
	}
}
function SwitchToState(NewPage)
{
	location.hash=encodeURIComponent(JSON.stringify(NewPage));

}
SwitchToStateFromURLHash();