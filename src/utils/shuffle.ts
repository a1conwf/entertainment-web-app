export const shuffleAndTake = <T>(items: T[], amount: number) =>
	[...items].sort(() => Math.random() - 0.5).slice(0, amount);
