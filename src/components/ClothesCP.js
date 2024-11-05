import styled from "styled-components";
import {
  sleeveless,
  shirt,
  longSleeve,
  cardigan,
  sweater,
  coat,
  hoodie,
  padding,
} from "../image";

const ClothesCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.4em;
  }
  img {
    width: 80px;
    margin-left: 20px;
  }
`;

// 옷 이미지
const clothesOptions = [
  { minTemp: 28, image: sleeveless },
  { minTemp: 23, image: shirt },
  { minTemp: 20, image: longSleeve },
  { minTemp: 17, image: cardigan },
  { minTemp: 12, image: sweater },
  { minTemp: 9, image: coat },
  { minTemp: 5, image: hoodie },
  { minTemp: -Infinity, image: padding },
];

const getClothesImage = (temperature) => {
  return clothesOptions.find((option) => temperature >= option.minTemp).image;
};

// 옷 텍스트
const clothesTextOptions = [
  { minTemp: 28, text: ["민소매", "반팔", "반바지"] },
  { minTemp: 23, text: ["반팔", "얇은 셔츠", "면바지"] },
  { minTemp: 20, text: ["얇은 가디건", "긴팔", "청바지"] },
  { minTemp: 17, text: ["얇은 니트", "맨투맨", "청바지"] },
  { minTemp: 12, text: ["가디건", "야상", "청바지"] },
  { minTemp: 9, text: ["트렌치 코트", "니트", "청바지"] },
  { minTemp: 5, text: ["코트", "자켓", "히트텍"] },
  { minTemp: -Infinity, text: ["패딩", "두꺼운 코트", "기모제품"] },
];

const getClothesText = (temperature) => {
  return clothesTextOptions.find((option) => temperature >= option.minTemp)
    .text;
};

function ClothesCP({ data }) {
  const clothesOption = getClothesImage(data);
  const clothesTextOption = getClothesText(data);
  const textList = clothesTextOption.map((text, index) => (
    <li key={index}>{text}</li>
  ));

  return (
    <ClothesCard>
      <ul>{textList}</ul>
      <img src={clothesOption} alt="clothesImg" />
    </ClothesCard>
  );
}

export default ClothesCP;
