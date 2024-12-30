/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import GlobeComponent from './GlobeComponent'

const Scene = ({ yearData, viewMode }) => {
	const globeRef = useRef(new THREE.Group())

	// Rotate the globe slowly
	useFrame(() => {
		globeRef.current.rotation.y += 0.001
	})

	return (
		<>
			{/* This group will hold the entire globe object */}
			<primitive object={globeRef.current} />
			<GlobeComponent globeRef={globeRef} yearData={yearData} viewMode={viewMode} />

			{/* Lights */}
			<ambientLight color={0xcccccc} intensity={1.3} />
			<directionalLight color={0xffffff} intensity={1.2} position={[100, 200, 100]} />
		</>
	)
}

export default Scene
