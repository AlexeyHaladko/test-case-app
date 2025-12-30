import type {
  FormSubmissionRequest, FormSubmissionResponse,
} from "@/api/generated.schemas.ts";
import { post } from "@/api/client.ts";
import { PATHS } from "@/api/paths.ts";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

const formSubmitMutationFn = async (payload: FormSubmissionRequest): Promise<FormSubmissionResponse> => {
  return await post<FormSubmissionRequest, FormSubmissionResponse>(PATHS.createCrop, payload);
}


function useSubmitForm(options: UseMutationOptions<FormSubmissionResponse, Error, FormSubmissionRequest> = {}) {
  const query = useMutation<FormSubmissionResponse, Error, FormSubmissionRequest>({
    mutationFn: formSubmitMutationFn,
    ...options
  });

  return query;
}

export default useSubmitForm;