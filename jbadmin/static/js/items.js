$(document).ready(function(){
	$.getJSON("../getItems/",function(data){
		var $row =$("#items");
		var context = "";
		$row.empty();
		$.each(data,function(dex,text){
			context += "<a href='../editItem?iid="+text['iid'] + "' class='col-50 external'>";
			context += "<div class='col-100'>";
			context += "<img class='col-100' src='"+text['pic'] +"' />";
			context += "<div class='row'>";
			context += "<div class='col-50'>"+text['iname']+"</div>";
			context += "<div class='col-50'>"+text['price']+"</div>";
			context += "</div>";
			context += "</div>";
			context += "</a>";
		});
		$row.html(context);
	});
});

//						<a href="#" class="col-50">
//							<div class="col-100">
//								<img class="col-100" src="/picture/jianbing/itempic/葱花.jpg" />
//							    <div class="row">
//									<div class="col-50">煎饼</div>
//									<div class="col-50">4元</div>
//								</div>
//							</div>
//						</a>