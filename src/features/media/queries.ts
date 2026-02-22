import { useQuery } from "@tanstack/react-query";
import { fetchTrending, fetchMovies, fetchTVSeries, fetchRecommended } from "./api";

export const useTrendingQuery = () => {
	return useQuery({
		queryKey: ["trending"],
		queryFn: fetchTrending,
		staleTime: 1000 * 60 * 5,
	});
};

export const useRecommendedQuery = () => {
	return useQuery({
		queryKey: ["recommended"],
		queryFn: fetchRecommended,
		staleTime: 1000 * 60 * 5,
	});
};

export const useMoviesQuery = () => {
	return useQuery({
		queryKey: ["movies"],
		queryFn: fetchMovies,
		staleTime: 1000 * 60 * 5,
	});
};

export const useTVSeriesQuery = () => {
	return useQuery({
		queryKey: ["tv-series"],
		queryFn: fetchTVSeries,
		staleTime: 1000 * 60 * 5,
	});
};
