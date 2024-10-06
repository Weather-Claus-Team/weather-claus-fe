import { atom, selector } from "recoil";

export const weatherState = atom({
  key: "weatherState",
  default: { weather: "", city: "" },
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const searchSelector = selector({
  key: "searchSelector",
  get: ({ get }) => {
    const searchWord = get(searchState);
    if (!searchWord) return "서울";
    return searchWord;

    // try {
    //   const data = await (
    //     await fetch(`/api/weather?query=${searchWord}`)
    //   ).json();
    //   return data;
    // } catch (error) {
    //   console.error(error);
    //   return null;
    // }
  },
});
