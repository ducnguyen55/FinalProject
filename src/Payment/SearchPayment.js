import React from 'react'

const SearchPayment = ({searchfield, searchChange}) => {
	return (
		<input 
		id="search-input" 
		class="form-control input-lg" 
		placeholder="Search product" 
		onChange={searchChange}
		/>
	)
}

export default SearchPayment;