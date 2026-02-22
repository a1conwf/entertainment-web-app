import { useEffect } from "react";
import { createPortal } from "react-dom";

type TrailerModalProps = {
	youtubeKey: string;
	onClose: () => void;
};

const TrailerModal: React.FC<TrailerModalProps> = ({ youtubeKey, onClose }) => {
	useEffect(() => {
		const handleEscClose = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscClose);
		return () => window.removeEventListener("keydown", handleEscClose);
	}, [onClose]);

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-dark-blue/80 p-4 lg:p-0"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
		>
			<div
				className="relative w-full max-w-250 aspect-video"
				onClick={(event) => event.stopPropagation()}
			>
				<iframe
					className="absolute h-full w-full"
					src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		</div>,
		document.body,
	);
};

export default TrailerModal;
