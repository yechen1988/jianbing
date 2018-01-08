$(document).ready(function(){
	var $form = $("#item");
	$form.prepend("<input type='hidden' name='iid' value='"+j['iid']+"' />");
	var $iname = $("#iname");
	$iname.attr('placeholder',j['iname']);
	var $iprice = $("#iprice");
	$iprice.attr('placeholder',j['iprice']);
	var $cid = $("#cid");
	$cid.attr('placeholder',j['cid']);
	var $ipic = $("#ipic");
	$ipic.attr('placeholder',j['ipic']);
	$ipic.after("<img class='col-100' id='ipicimg' src='"+j['ipic']+"' />");	
});

//<input type='hidden' name='csrfmiddlewaretoken' value='' />
//											<li>
//												<div class="item-content">
//													<div class="item-media">
//														<i class="icon icon-form-name"></i>
//													</div>
//													<div class="item-inner">
//														<div class="item-title label">商品图片</div>
//														<div class="item-input">
//															<input type="file" placeholder="请上传图片" name="ipic"  id="ipic" accept="image/jpeg"/>
//														</div>
//													</div>
//												</div>
//											</li>