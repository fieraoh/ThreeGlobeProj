/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
import ThreeGlobe from 'three-globe'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const CameraControls = () => {
	const { camera, gl } = useThree()
	const controlsRef = useRef()

	useEffect(() => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		camera.position.z = 500

		controlsRef.current = new TrackballControls(camera, gl.domElement)
		controlsRef.current.minDistance = 101
		controlsRef.current.rotateSpeed = 5
		controlsRef.current.zoomSpeed = 0.8

		return () => {
			controlsRef.current.dispose()
		}
	}, [camera, gl])

	useFrame(() => {
		controlsRef.current.update()
	})

	return null
}

const GlobeComponent = ({ globeRef }) => {
	useEffect(() => {
		const Globe = new ThreeGlobe()
			.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
			.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')

		if (globeRef.current) {
			globeRef.current.add(Globe)
		}
	}, [globeRef])

	return null
}

const Scene = ({ globeRef }) => {
	useFrame(() => {
		if (globeRef.current) {
			globeRef.current.rotation.y += 0.001
		}
	})

	return (
		<>
			<GlobeComponent globeRef={globeRef} />
			<ambientLight color={new THREE.Color().setHex(0xcccccc)} intensity={Math.PI} />
			<directionalLight color={new THREE.Color().setHex(0xffffff)} intensity={0.6 * Math.PI} />
		</>
	)
}

const App = () => {
	const globeRef = useRef()

	return (
		<Canvas style={{ width: '100vw', height: '100vh' }}>
			<CameraControls />
			<group ref={globeRef}>
				<Scene globeRef={globeRef} />
			</group>
		</Canvas>
	)
}

export default App
