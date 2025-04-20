export const cleanUrl = (url) => {
  //convert from https://drive.google.com/file/d/1-n49I0Qk1N-m1e-w05e0-O5OYcHBEcXj/view?usp=share_link to https://drive.google.com/uc?export=view&id=1-n49I0Qk1N-m1e-w05e0-O5OYcHBEcXj if not already

  // extract id from https://drive.google.com/open?id=1X_RZqaHFXU5qc1PHx_R2lCGmUj-S99xi

  const googleDriveUrl = "https://drive.google.com/uc?export=view&id=";
  const googleDriveUrl2 = "https://drive.google.com/file/d/";
  const googleDriveUrl3 = "https://drive.google.com/open?id=";

  if (url === null || url === undefined || url === "") return null;

  if (url.startsWith(googleDriveUrl2)) {
    const id = url.split(googleDriveUrl2)[1].split("/")[0];
    return googleDriveUrl + id;
  }

  if (url.startsWith(googleDriveUrl3)) {
    const id = url.split("id=")[1].split("&")[0];
    return googleDriveUrl + id;
  }

  return url;
}
