function Category(){
	this.cid = 0;
	this.cname = '';
	this.cdepend_id = 0;
};

var cs = [];

$(document).ready(function(){
	$.getJSON("../getCategorys/",function(data){
		var $row =$("#add");
//		cid cname cdenpend_id
		var context = "";
		$.each(data,function(dex,text){
			var c = new Category();
			c.cid = text['cid'];
			c.cname = text['cname'];
			c.cdepend_id = text['cdepend_id'];
			cs.push(c);
		});
		
		$.each(cs,function(dex,c){
				context +=		"<li>";
				context +=		"	<div class='item-content'>";
				context +=		"		<div class='item-inner'>";
				context +=		"			<input type='hidden' id='cid"+c.cid+"' value='"+c.cid+"' />";
				context +=		"			<div class='item-title label-17'>分类名：</div>";
				context +=		"			<div class='item-input col-17'>";
				context +=		"				<input type='text' value='"+c.cname+"' id='cname"+c.cid+"' />";
				context +=		"			</div>";
				context +=		"			<div class='item-title label-17'>附属：</div>";
				context +=		"			<div class='item-input col-17'>";
				context +=		"				<select id='cdepend"+c.cid+"'  value='"+c.cdepend_id+"'>";
				context +=      "                    <option value='0' id='v0'>无</option>"
				$.each(cs,function(dex,cc){
					if(cc.cid!=c.cid){
						if(cc.cid == c.cdepend_id){
							context +=						"<option value='"+cc.cid+"' selected>"+cc.cname+"</option>";
						}
						else{
							context +=						"<option value='"+cc.cid+"' >"+cc.cname+"</option>";
						}
					}
				});		
				context +=		"				</select>";
				context +=		"			</div>";
				context +=		"			<div class='item-input col-16'>"
				context +=		"				<a href='#' class='button button-raised button-fill color-green' onclick='editCategory("+c.cid+")'>修改</a>";
				context +=		"			</div>";
				context +=		"			<div class='item-input col-16'>";
				context +=		"				<a href='#' class='button button-raised button-fill color-red' onclick='delCategory("+c.cid+")'>删除</a>";
				context +=		"			</div>";
				context +=		"		</div>";
				context +=		"	</div>";
				context +=		"</li>";
		});
		$row.before(context);
	});
});

function editCategory(cid){
	var cnameInput = "cname"+cid;
	var token = $("[name='csrfmiddlewaretoken']").val();
	var cdependSelect ="cdepend"+cid;
	var cname = $("#"+cnameInput).val();
	var cdepend = $("#"+cdependSelect).val();
	$.post("../editCategory/",{'csrfmiddlewaretoken':token,'cid':cid,'cname':cname,'cdenpend_id':cdepend},function(data,status){
		//未完成
			if(status == 'success'){
				myApp.alert(status['success'], '成功', function(){
					window.location.reload();
				});
			};
	});
};

function delCategory(cid){
		    myApp.confirm('确定删除该分类？', 
		      function () {
		        	var token = $("[name='csrfmiddlewaretoken']").val();
					$.post("../delCategory/",{'csrfmiddlewaretoken':token,'cid':cid},function(data,status){				
							if(status == 'success'){
								myApp.alert(status['success'], '成功', function(){
									window.location.reload();
								});
							};
					});
		      },
		      function () {
		      }
		    );
};

function addCategoryForm(){
				var context = '';
				context +=		"<li>";
				context +=		"	<div class='item-content'>";
				context +=		"		<div class='item-inner'>";
				context +=		"			<div class='item-title label-17'>分类名：</div>";
				context +=		"			<div class='item-input col-17'>";
				context +=		"				<input type='text' placeholder='分类名' id='cname' />";
				context +=		"			</div>";
				context +=		"			<div class='item-title label-17'>附属：</div>";
				context +=		"			<div class='item-input col-17'>";
				context +=		"				<select id='cdependadd' >";
				context +=      "                    <option value='0'>无</option>"
				$.each(cs,function(dex,cc){
							context +=						"<option value='"+cc.cid+"'>"+cc.cname+"</option>";
				});		
				context +=		"				</select>";
				context +=		"			</div>";
				context +=		"			<div class='item-input col-16'>"
				context +=		"				<a href='#' class='button button-raised button-fill color-green' onclick='addCategory()'>添加</a>";
				context +=		"			</div>";
				context +=		"		</div>";
				context +=		"	</div>";
				context +=		"</li>";
				var $row =$("#add");
				$row.before(context);
};

function addCategory(){
		var token =$("[name='csrfmiddlewaretoken']").val();
		var cname = $('#cname').val();
		var cdepend = $('#cdependadd').val();
		$.post("../editCategory/",{'csrfmiddlewaretoken':token,'cname':cname,'cdenpend_id':cdepend},function(data,status){
		//未完成
			if(status == 'success'){
				myApp.alert(status['success'], '成功', function(){
					window.location.reload();
				});
			};
		});
};


//						<li>
//							<div class="item-content">
//								<div class="item-inner">
//									<input type='hidden' id='cid' value='1' />
//									<div class="item-title label-17">分类名：</div>
//									<div class="item-input col-17">
//										<input type="text" placeholder="分类名称" name="uname" />
//									</div>
//									<div class="item-title label-17">附属：</div>
//									<div class="item-input col-17">
//										<select id='cdepend'  value='2'>
//											<option value='1'>Male</option>
//											<option value='2'>Female</option>
//										</select>
//									</div>
//									<div class="item-input col-16">
//										<a id='1' href="#" class="button button-raised button-fill color-green">修改</a>
//									</div>
//									<div class="item-input col-16">
//										<a id='1' href="#" class="button button-raised button-fill color-red">删除</a>
//									</div>
//								</div>
//							</div>
//						</li>