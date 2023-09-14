import "./styles/Specie.css";

const Specie = ({species}) => {
	return (
		<div className="container-specie">
			<h2>SPECIES</h2>
			<h3>Name - ' <span>{species[0]?.name}</span> ' <br/>
			Language - ' <span>{species[0]?.language}</span> ' <br/>
			Designation - ' <span>{species[0]?.designation.charAt(0).toUpperCase() + species[0]?.designation.slice(1)}</span> ' <br/>
			Clasiffication - ' <span>{species[0]?.classification.charAt(0).toUpperCase() + species[0]?.classification.slice(1)}</span> '
			</h3>
		</div>
	)
}

export default Specie;