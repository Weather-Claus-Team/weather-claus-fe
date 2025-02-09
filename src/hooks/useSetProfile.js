import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileUploadApi from "../api/myPageApis/profileUploadApi";

const fetchSetProfile = async (body) => {
  const response = await profileUploadApi(body);
  return response;
};

export const useSetProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchSetProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPage"] });
    },
    onError: (error) => {
      console.error("Error fetching MyPage data:", error);
    },
  });
};
