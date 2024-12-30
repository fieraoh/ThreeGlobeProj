import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
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
			controlsRef.current?.dispose()
		}
	}, [camera, gl])

	useFrame(() => {
		controlsRef.current?.update()
	})

	return null
}

export default CameraControls
