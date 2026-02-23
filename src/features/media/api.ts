import { axiosInstance } from "@/services/axios";
import { ENDPOINTS } from "@/services/endpoints";
import type { MediaItem, MediaListResponse, RawMediaItem, MediaVideosResponse } from "./types";
import { shuffleAndTake } from "@/utils/shuffle";

export const fetchTrending = async (): Promise<MediaItem[]> => {
	try {
		const response = await axiosInstance.get<MediaListResponse<RawMediaItem>>(ENDPOINTS.TRENDING);
		const trendingItems = response.data.results
			.filter(
				(item): item is RawMediaItem & { media_type: "movie" | "tv" } =>
					item.media_type === "movie" || item.media_type === "tv",
			)
			.map((item) => ({
				...item,
				media_type: item.media_type,
			}));
		return shuffleAndTake(trendingItems, 5);
	} catch (error) {
		console.error("Error fetching trending media:", error);
		throw error;
	}
};

export const fetchRecommended = async (): Promise<MediaItem[]> => {
	try {
		const [movies, tvSeries] = await Promise.all([fetchMovies(), fetchTVSeries()]);
		return shuffleAndTake([...movies, ...tvSeries], 20);
	} catch (error) {
		console.error("Error fetching recommended media:", error);
		throw error;
	}
};

export const fetchMovies = async (): Promise<MediaItem[]> => {
	try {
		const response = await axiosInstance.get<MediaListResponse<RawMediaItem>>(ENDPOINTS.MOVIES);
		return response.data.results.map((movie) => ({
			...movie,
			media_type: "movie" as const,
		}));
	} catch (error) {
		console.error("Error fetching movies:", error);
		throw error;
	}
};

export const fetchTVSeries = async (): Promise<MediaItem[]> => {
	try {
		const response = await axiosInstance.get<MediaListResponse<RawMediaItem>>(ENDPOINTS.TV_SERIES);
		return response.data.results.map((tvSeries) => ({
			...tvSeries,
			media_type: "tv" as const,
		}));
	} catch (error) {
		console.error("Error fetching TV series:", error);
		throw error;
	}
};

export const fetchTrailerKey = async (
	mediaType: MediaItem["media_type"],
	mediaId: number,
): Promise<string | null> => {
	try {
		const response = await axiosInstance.get<MediaVideosResponse>(
			`/${mediaType}/${mediaId}/videos`,
		);

		const youtubeVideos = response.data.results.filter((video) => video.site === "YouTube");
		const officialTrailer = youtubeVideos.find(
			(video) => video.type === "Trailer" && Boolean(video.official),
		);

		if (officialTrailer?.key) return officialTrailer.key;

		const trailer = youtubeVideos.find((video) => video.type === "Trailer");
		if (trailer?.key) return trailer.key;

		const teaser = youtubeVideos.find((video) => video.type === "Teaser");
		return teaser?.key ?? null;
	} catch (error) {
		console.error("Error fetching trailer key");
		throw error;
	}
};
