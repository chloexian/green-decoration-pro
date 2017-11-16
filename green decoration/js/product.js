$(function(){
	$(".pic .big-pic .cover").hover(
		function () {
			$(this).find(".cover-color").css('display','block');
			$(this).find(".square-small").css('display','block');  
		 },
		 
		function () {
			$(this).find(".cover-color").css('display','none'); 
			$(this).find(".square-small").css('display','none'); 
		},

		
	)
})