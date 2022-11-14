import { generateZipFile } from "./zip";
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
      formData.append(fieldName, ele);
    })
  }
  const response = await fetch(SERVER_URL + url, {
    method: "POST",
    body: formData,
  });
  return response;
}


export async function uploadZip({
  url,
  file,
  fieldName = "file",
}: {
  url: string;
  file: File[];
  fieldName?: string;
}): Promise<any> {
  const data = await generateZipFile('images.zip', file)
  let formData = new FormData();
  formData.set(fieldName, data);
  const response = await fetch(SERVER_URL + url, {
    method: "POST",
    body: formData,
  });
  return response;
}

const isFile = (s: unknown): s is File =>  s instanceof File