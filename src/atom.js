import { atom, selector } from "recoil";

// export const weatherState = atom({
//   key: "weatherState",
//   default: { weather: "", city: "" },
// });

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const searchSelector = selector({
  key: "searchSelector",
  get: async ({ get }) => {
    const searchWord = get(searchState);
    // 디폴트 지역 -- 서울
    if (!searchWord) {
      try {
        const fakeSeoulData = {
          ok: true,
          json: async () => ({
            temp: 20,
            date: "10-08",
            weather: "sunny",
            name: "서울",
          }),
        };

        const response = fakeSeoulData;

        if (!response.ok) {
          console.log("fail");
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      // 사용자 검색 지역
      try {
        const fakeData = {
          ok: true,
          json: async () => ({
            temp: 22,
            weather: "흐림",
          }),
        };
        const response = fakeData;

        if (!response.ok) {
          console.log("fail");
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
});

// const response = await fetch("http://localhost:3000/api/weather", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ city: searchWord }),
//   });
