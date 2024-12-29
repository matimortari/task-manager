"use client"

import { ReactNode, useEffect, useRef } from "react"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children?: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			onClose()
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="popover relative w-full max-w-lg" ref={ref}>
				<button type="button" className="btn absolute right-3 top-3" onClick={onClose}>
					✕
				</button>
				{children}
			</div>
		</div>
	)
}
