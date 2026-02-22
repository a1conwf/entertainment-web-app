import toast from "react-hot-toast";

import { useState } from "react";
import { fetchTrailerKey } from "../api";
import type { MediaItem } from "../types";

export const useTrailerPreview = (mediaType: MediaItem["media_type"], mediaId: number) => {
	const [trailerKey, setTrailerKey] = useState<string | null>(null);
	const [isTrailerLoading, setIsTrailerLoading] = useState(false);

	const handlePlayPreview = async () => {
		setIsTrailerLoading(true);

		try {
			const key = await fetchTrailerKey(mediaType, mediaId);

			if (!key) {
				toast.error("Trailer preview is not available for this title.");
				return;
			}

			setTrailerKey(key);
		} catch (error) {
			console.error("Error loading trailer preview:", error);
			toast.error("Couldn't load trailer preview. Please try again.");
		} finally {
			setIsTrailerLoading(false);
		}
	};

	return {
		trailerKey,
		isTrailerLoading,
		handlePlayPreview,
		setTrailerKey,
	};
};
