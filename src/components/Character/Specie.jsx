const Specie = ({species}) => {
	return (
		<div>
			<h1>SPECIES</h1>
			<h2>Name - ' <span>{species[0]?.name}</span> ' <br/>
			Language - ' <span>{species[0]?.language}</span> ' <br/>
			Designation - ' <span>{species[0]?.designation.charAt(0).toUpperCase() + species[0]?.designation.slice(1)}</span> ' <br/>
			Clasiffication - ' <span>{species[0]?.classification.charAt(0).toUpperCase() + species[0]?.classification.slice(1)}</span> '
			</h2>
		</div>
	)
}

export default Specie;