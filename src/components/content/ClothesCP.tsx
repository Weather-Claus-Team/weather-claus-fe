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
} from "../../image";

// TypeScript 타입 정의
interface ClothesProps {
  data: number;
}

// 스타일링
const ClothesCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    line-height: 1.5em;
  }
  img {
    width: 90px;
    margin-left: 25px;
  }
`;

// 옷 이미지 옵션
interface ClothesImageOption {
  minTemp: number;
  image: string;
}

const clothesOptions: ClothesImageOption[] = [
  { minTemp: 28, image: sleeveless },
  { minTemp: 23, image: shirt },
  { minTemp: 20, image: longSleeve },
  { minTemp: 17, image: cardigan },
  { minTemp: 12, image: hoodie },
  { minTemp: 9, image: coat },
  { minTemp: 5, image: sweater },
  { minTemp: -Infinity, image: padding },
];

// 옷 텍스트 옵션
interface ClothesTextOption {
  minTemp: number;
  text: string[];
}

const clothesTextOptions: ClothesTextOption[] = [
  { minTemp: 28, text: ["민소매", "반팔", "반바지"] },
  { minTemp: 23, text: ["반팔", "얇은 셔츠", "면바지"] },
  { minTemp: 20, text: ["얇은 가디건", "긴팔", "청바지"] },
  { minTemp: 17, text: ["얇은 니트", "가디건", "청바지"] },
  { minTemp: 12, text: ["야상", "맨투맨", "청바지"] },
  { minTemp: 9, text: ["트렌치 코트", "니트", "청바지"] },
  { minTemp: 5, text: ["코트", "니트", "히트텍"] },
  { minTemp: -Infinity, text: ["패딩", "두꺼운 코트", "기모제품"] },
];

// 기온에 맞는 옷 이미지 반환
const getClothesImage = (temperature: number): string => {
  const option = clothesOptions.find((option) => temperature >= option.minTemp);
  return option ? option.image : sleeveless; // 기본값으로 sleeveless 반환
};

// 기온에 맞는 옷 텍스트 반환
const getClothesText = (temperature: number): string[] => {
  const option = clothesTextOptions.find((option) => temperature >= option.minTemp);
  return option ? option.text : [];
};

const ClothesCP: React.FC<ClothesProps> = ({ data }) => {
  const clothesOption:string = getClothesImage(data);
  const clothesTextOption = getClothesText(data);
  const textList = clothesTextOption.map((text, index) => <li key={index}>{text}</li>);

  return (
    <ClothesCard>
      <ul>{textList}</ul>
      <img src={clothesOption} alt="clothesImg" />
    </ClothesCard>
  );
};

export default ClothesCP;
