// 아이디 중복 검사
export const checkDuplicateUsername = async (username) => {
  try {
    const response = await fetch(`/api/check-username?username=${username}`);
    const result = await response.json();
    return result.isDuplicate; // 백엔드에서 isDuplicate : true(중복) / false(중복 x)로 반환
  } catch (error) {
    console.error("Error checking username:", error);
    return null;
  }
};
