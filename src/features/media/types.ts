export type MediaType = "movie" | "tv";

export type MediaItem = {
	id: number;
	title?: string;
	name?: string;
	adult: boolean;
	backdrop_path: string;
	media_type: MediaType;
	release_date?: string;
	original_name?: string;
	first_air_date?: string;
};

export type RawMediaItem = Omit<MediaItem, "media_type"> & {
	media_type?: MediaType;
};

export type MediaListResponse<T> = {
	results: T[];
};

export type MediaVideo = {
	key: string;
	site: string;
	type: string;
	official?: boolean;
};

export type MediaVideosResponse = {
	results: MediaVideo[];
};
