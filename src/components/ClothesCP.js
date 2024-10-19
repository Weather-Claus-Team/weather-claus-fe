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
  margin-left: 20px;
  padding-bottom: 30px;
  img {
    width: 80px;
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

function ClothesCP({ data }) {
  const clothesOption = getClothesImage(data);

  return (
    <ClothesCard>
      <img src={clothesOption} alt="clothesImg" />
    </ClothesCard>
  );
}

export default ClothesCP;
