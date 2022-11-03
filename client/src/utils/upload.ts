const SERVER_URL = "http://localhost:3000/upload";

export async function upload({
  url,
  file,
  fieldName = "file",
}: {
  url: string;
  file: File | File[];
  fieldName?: string;
}): Promise<Response> {
  let formData = new FormData();
  if (isFile(file)) {
    formData.set(fieldName, file);
  } else {
    file.forEach((ele)=> {
      formData.set(fieldName, ele);
    })
  }
  const response = await fetch(SERVER_URL + url, {
    method: "POST",
    body: formData,
  });
  return response;
}


const isFile = (s: unknown): s is File =>  s instanceof File