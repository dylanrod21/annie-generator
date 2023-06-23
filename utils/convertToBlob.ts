export default async function convertToBlob(url: string) {
  try {
    const response = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: "cors",
    });

    const blob = await response.blob();
    
    return blob;
  } catch (e) {
    console.error(e);
    return undefined; // or return a default blob or throw an error
  }
}
