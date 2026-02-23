import { memo } from "react";
import searchIcon from "@/assets/svg/icon-search.svg";

type SearchInputProps = {
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, value, onChange }) => {
	return (
		<div className="flex items-center gap-6 my-6 md:my-8 xl:mt-14 xl:mb-8">
			<img src={searchIcon} alt="search-icon" className="relative top-[-2px] md:top-[-6px]" />
			<input
				type="text"
				name="search"
				autoComplete="off"
				id="search"
				placeholder={placeholder}
				className="input text-base pb-2 placeholder:text-base border-b border-transparent focus:border-greyish-blue  md:placeholder:text-2xl md:text-2xl md:pb-3"
				value={value ?? ""}
				onChange={onChange}
			/>
		</div>
	);
};

export default memo(SearchInput);
