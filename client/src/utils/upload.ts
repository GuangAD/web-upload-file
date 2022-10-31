const SERVER_URL = "http://localhost:3000/upload";

export async function upload({
  url,
  file,
  fieldName = "file",
}: {
  url: string;
  file: File;
  fieldName?: string;
}): Promise<Response> {
  let formData = new FormData();
  formData.set(fieldName, file);
  const response = await fetch(SERVER_URL + url, {
    method: "POST",
    body: formData,
  });
  return response;
}
