import React from 'react'

const SearchBox = ({searchfield, searchChange}) => {
	return (
		<input 
		id="search-input" 
		class="form-control input-lg" 
		size="20"
		placeholder="Search payment" 
		onChange={searchChange}
		/>
	)
}

export default SearchBox;