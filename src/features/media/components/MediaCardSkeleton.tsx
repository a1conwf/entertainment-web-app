const MediaCardSkeleton: React.FC = () => {
	return (
		<article className="animate-pulse">
			<div className="mb-2 aspect-video w-full rounded-lg bg-slate-700" />
			<div className="mb-2 flex items-center gap-2">
				<div className="h-3 w-10 rounded bg-slate-700" />
				<div className="h-3 w-16 rounded bg-slate-700" />
				<div className="h-3 w-8 rounded bg-slate-700" />
			</div>
			<div className="h-4 w-3/4 rounded bg-slate-700" />
		</article>
	);
};

export default MediaCardSkeleton;
