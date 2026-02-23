import type { MediaItem } from "../types";

export const useMediaCardData = (item: MediaItem) => {
	const title = item.title || item.name;
	const releaseYear = (item.release_date || item.first_air_date)?.split("-")[0];
	const adultRating = item.adult ? "18+" : "E";
	const mediaType = item.media_type;
	const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Series";

	return {
		title,
		releaseYear,
		adultRating,
		mediaType,
		mediaTypeText,
	};
};
