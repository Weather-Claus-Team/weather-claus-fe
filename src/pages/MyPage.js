import { useMyPage } from "../hooks/useMypage";

function MyPage() {
  const { data, isLoading, isError, isFetching } = useMyPage();

  if (isFetching || isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }
  console.log(data);

  return (
    <>
      <div>데이터</div>
      <div>{data}</div>
    </>
  );
}

export default MyPage;
