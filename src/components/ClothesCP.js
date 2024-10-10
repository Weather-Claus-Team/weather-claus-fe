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
  flex-direction: column;
  align-items: center;
  img {
    width: 180px;
    margin-top: 40px;
  }
`;

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

function ClothesCP(data) {
  const TEMPERATURE = data.contents.temp;
  const clothesOption = getClothesImage(TEMPERATURE);

  return (
    <ClothesCard>
      <span>추천 옷차림</span>
      <img src={clothesOption} alt="clothesImg" />
    </ClothesCard>
  );
}

export default ClothesCP;
