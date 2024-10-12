/* eslint-disable react/jsx-sort-props */
const GoogleMap = () => {
	return (
		<>
			<div style={{ width: "100%", height: "450px" }}>
				<iframe
					height="450"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187878219!2d90.33728799397399!3d23.78097572837469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1720689165997!5m2!1sen!2sbd"
					title="Google Map showing Dhaka"
					width="100%"
					style={{ border: 0 }}
					// allowFullScreen=""
					loading="lazy"
				/>
			</div>
		</>
	)
}

export default GoogleMap
