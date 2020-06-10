import React from 'react';

const ProductPayment = ({url,name,price}) => {	
	return(
		<div className="item clearFix">
			<div className="col col01">
				<img alt='imageproduct' src={`${url}`} id="image" />
	        </div>
			<div className="col col02">
	            <h4>CHÂN VÁY XÒE CÔNG SỞ ĐẸP JS20-031</h4>
	            <h4>(JS20-031M.DEN)</h4>
			</div>
			<div class="col col03">
				<h4>Giá</h4>
				<p style={{"text-decoration": "line-through"}}>
	    			495,000
				</p>
				<p>
	    			<strong>399,000</strong>
				</p>
			</div>
			<div class="col col04">
				<h4>Số lượng</h4>
	            <select id="update-number" onchange="UpdateCart('101d9ca6-7731-41ca-b558-039ac0ec4be5',this); ">
	                    <option value="1" selected="selected">1</option>
	                    <option value="2">2</option>
	                    <option value="3">3</option>
	                    <option value="4">4</option>
	                    <option value="5">5</option>
	                    <option value="6">6</option>
	                    <option value="7">7</option>
	                    <option value="8">8</option>
	                    <option value="9">9</option>
	                    <option value="10">10</option>
	            </select>
	            <a href="javascript:void(0)" class="status delCart" onclick="DeleteCart('101d9ca6-7731-41ca-b558-039ac0ec4be5');">Xóa</a>
	        </div>
		</div>
	)
}

export default ProductPayment;